// src/components/Register.js
import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Importa el hook

const Register = ({ handleRegister }) => {
  const { authValues, handleAuthChange, handleRegister: registerUser, loading, error } = useAuth(); // Utiliza el hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(); // Llama a la función de registro del hook
  };

  return (
    <div className="w-80 rounded-2xl bg-slate-900 bg-opacity-50">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Register</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error.general}</p>}
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Display Name"
            name="displayName"
            value={authValues.displayName}
            onChange={handleAuthChange}
          />
          {error && error.displayName && <p className="text-red-500">{error.displayName}</p>}
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Email"
            name="email"
            value={authValues.email}
            onChange={handleAuthChange}
          />
          {error && error.email && <p className="text-red-500">{error.email}</p>}
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Phone"
            name="phone"
            value={authValues.phone}
            onChange={handleAuthChange}
          />
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Password"
            type="password"
            name="password"
            value={authValues.password}
            onChange={handleAuthChange}
          />
          {error && error.password && <p className="text-red-500">{error.password}</p>}
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={authValues.confirmPassword}
            onChange={handleAuthChange}
          />
          {error && error.confirmPassword && <p className="text-red-500">{error.confirmPassword}</p>}
          <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
            Accept terms of use
            <div className="relative inline-block">
              <input
                className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gray-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                type="checkbox"
                name="acceptTerms"
                checked={authValues.acceptTerms}
                onChange={handleAuthChange}
              />
              <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
            </div>
          </label>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="userType"
                value="user"
                checked={authValues.userType === 'user'}
                onChange={handleAuthChange}
              />
              <span className="ml-2 text-gray-300">User</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="userType"
                value="driver"
                checked={authValues.userType === 'driver'}
                onChange={handleAuthChange}
              />
              <span className="ml-2 text-gray-300">Driver</span>
            </label>
          </div>
          <button
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;