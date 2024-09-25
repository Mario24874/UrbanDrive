// src/components/Welcome.js
import React from 'react';
import urbanDriveLogo from '../assets/images/UrbanDrive.png';

const Welcome = () => {
  return (
    <div className="flex items-center justify-center mb-4">
      <img src={urbanDriveLogo} alt="UrbanDrive Logo" className="w-16 h-16 mr-4" />
      <h1 className="text-3xl font-bold text-white">UrbanDrive</h1>
    </div>
  );
};

export default Welcome;