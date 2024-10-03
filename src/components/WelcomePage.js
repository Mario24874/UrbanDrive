// src/components/WelcomePage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UrbanDriveLogo from '../assets/images/UrbanDrive.png';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login-register'); // Cambia esto a la ruta donde tienes tu Auth.js
    }, 3000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <img src={UrbanDriveLogo} alt="UrbanDrive Logo" className="mx-auto h-36 w-auto" />
        <p className="text-center text-2xl font-bold text-gray-900 mt-4">Welcome to UrbanDrive</p>
      </div>
    </div>
  );
};

export default WelcomePage;