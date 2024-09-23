import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { supabaseClient } from './supabase';
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

const App = () => {
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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
      const [locationsData, messagesData] = await Promise.all([
        supabaseClient.from('locations').select('*'),
        supabaseClient.from('messages').select('*')
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
  }, []);

  const handleRegister = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await supabaseClient.from('users').insert([{ id: userCredential.user.uid }]);
      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
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
      const { data, error } = await supabaseClient.from('messages').insert([{ message, driver_id: selectedDriver }]);
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