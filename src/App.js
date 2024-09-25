// src/App.js
import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import backgroundImage from './assets/images/background.jpg';
import Welcome from './components/Welcome';
import Auth from './components/Auth';
import Drivers from './components/Drivers';
import Messages from './components/Messages';
import Locations from './components/Locations';
import Geolocation from './components/Geolocation';
import DriverMap from './components/DriverMap';
import DriverInvitations from './components/DriverInvitations';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);
  const [locations] = useState({}); // Eliminamos setLocations
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const { user } = session;
        setUser(user);
        setIsAuthenticated(true);
        await fetchUserData(user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const fetchUserData = async (user) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', user.id).single();
    if (error) {
      console.error(error);
    } else {
      setUser({ ...user, ...data });
    }
  };

  const handleRegister = async (data) => {
    const { user, error } = await supabase.auth.signUp({ email: data.email, password: data.password });
    if (error) {
      console.error('Error registering:', error.message);
      alert('Error registering user.');
    } else {
      await supabase.from('users').insert([{
        id: user.id,
        email: user.email,
        display_name: data.displayName,
        phone: data.phone,
        user_type: data.userType,
        created: new Date().toISOString(),
        last_sign_in: new Date().toISOString(),
      }]);
      setUser(user);
      setIsAuthenticated(true);
    }
  };

  const handleAuthentication = (user) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleSendMessage = async (message) => {
    try {
      const { data, error } = await supabase.from('messages').insert([{ message, driver_id: selectedDriver }]);
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
      await supabase.auth.signOut();
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
      <div className="max-w-7xl mx-auto p-4 text-center bg-black bg-opacity-70">
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
            <Auth handleAuthentication={handleAuthentication} handleRegister={handleRegister} />
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