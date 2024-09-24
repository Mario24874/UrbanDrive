// src/App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { createSupabaseClient } from './supabase'; // Importar ambos clientes de Supabase
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import backgroundImage from './assets/images/background.jpg';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import Drivers from './components/Drivers';
import Messages from './components/Messages';
import Locations from './components/Locations';
import Geolocation from './components/Geolocation';
import DriverMap from './components/DriverMap';
import DriverInvitations from './components/DriverInvitations';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { convertFirebaseUUIDToStandard } from './utils/utils'; // Importar la función de conversión

const App = () => {
  const [user, setUser] = useState(null);
  const [supabaseClientWithToken, setSupabaseClientWithToken] = useState(null);
  const [locations, setLocations] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User UID:', user.uid); // Depurar el valor del UID
        const standardUUID = convertFirebaseUUIDToStandard(user.uid); // Convertir el UUID
        const client = await createSupabaseClient(); // Obtener el cliente de Supabase con el token de acceso
        setSupabaseClientWithToken(client);
        const { data, error } = await client.from('users').select('id').eq('id', standardUUID).single();
        if (error) {
          console.error(error);
        } else if (!data) {
          // Si el usuario no existe en Supabase, crear un registro
          const { error: insertError } = await client.from('users').insert([{
            id: standardUUID,
            email: user.email,
            display_name: user.displayName || '',
            phone: user.phoneNumber || '',
            provider: user.providerData[0].providerId,
            created: new Date().toISOString(),
            last_sign_in: new Date().toISOString(),
          }]);
          if (insertError) {
            console.error(insertError);
          }
        }
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!supabaseClientWithToken) return;
      const [locationsData, messagesData] = await Promise.all([
        supabaseClientWithToken.from('locations').select('*'),
        supabaseClientWithToken.from('messages').select('*')
      ]);

      if (locationsData.error) {
        console.error(locationsData.error);
      } else {
        setLocations(locationsData.data.reduce((acc, location) => ({ ...acc, [location.driver_id]: location }), {}));
      }

      if (messagesData.error) {
        console.error(messagesData.error);
      } else {
        setMessages(messagesData.data);
      }
    };

    fetchData();
  }, [supabaseClientWithToken]);

  const handleRegister = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const standardUUID = convertFirebaseUUIDToStandard(userCredential.user.uid); // Convertir el UUID
      const client = await createSupabaseClient(); // Obtener el cliente de Supabase con el token de acceso
      await client.from('users').insert([{
        id: standardUUID,
        email: userCredential.user.email,
        display_name: data.displayName,
        phone: data.phone,
        provider: 'email',
        created: new Date().toISOString(),
        last_sign_in: new Date().toISOString(),
        user_type: data.userType,
      }]);
      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('The email address is already in use by another account.');
      } else {
        console.error(error);
        alert('Error registering user in Firebase');
      }
    }
  };

  const handleAuthentication = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Authentication failed. Please check your credentials.');
    }
  };

  const handleSendMessage = async (message) => {
    try {
      const { data, error } = await supabaseClientWithToken.from('messages').insert([{ message, driver_id: selectedDriver }]);
      if (error) {
        console.error(error);
      } else {
        setMessages([...messages, data[0]]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectDriver = (driverId) => {
    setSelectedDriver(driverId);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      alert('Logged out successfully');
    } catch (error) {
      console.error(error);
      alert('Error logging out');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="max-w-7xl mx-auto p-4 text-center">
          <Welcome />
          {isAuthenticated ? (
            <div className="space-y-4">
              <button
                className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
                onClick={handleLogout}
              >
                Logout
              </button>
              <Drivers user={user} handleSelectDriver={handleSelectDriver} />
              {selectedDriver && (
                <div className="space-y-4">
                  <Locations locations={locations} selectedDriver={selectedDriver} />
                  <Messages messages={messages} newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />
                  <DriverMap />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Register handleRegister={handleRegister} />
              <Login handleAuthentication={handleAuthentication} />
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/geolocation" element={<Geolocation />} />
          <Route path="/driver-map" element={<DriverMap />} />
          <Route path="/driver-invitations" element={<DriverInvitations driver={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;