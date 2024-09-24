import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Auth = ({ handleAuthentication, handleRegister }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login / Register
          </h2>
        </div>
        <Login handleAuthentication={handleAuthentication} />
        <Register handleRegister={handleRegister} />
        <div className="mt-8">
          <h3 className="text-center text-xl font-semibold text-gray-900">
            Test Components
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/geolocation" className="text-indigo-600 hover:text-indigo-800">
                Geolocation
              </Link>
            </li>
            <li>
              <Link to="/driver-map" className="text-indigo-600 hover:text-indigo-800">
                Driver Map
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auth;