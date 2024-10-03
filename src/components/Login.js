// src/components/Login.js
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = ({ handleLogin }) => {
  const { authValues, handleAuthChange, handleSubmit, loading, error } = useAuth();

  const handleFormSubmit = async (e) => {
    const user = await handleSubmit(e);
    if (user) {
      handleLogin({ user, email: authValues.email, password: authValues.password });
      alert('Login successful!');
      // Clear form inputs
      handleAuthChange({ target: { name: 'email', value: '' } });
      handleAuthChange({ target: { name: 'password', value: '' } });
    }
  };

  return (
    <div className="w-80 rounded-2xl bg-slate-900 bg-opacity-50">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Login</p>
        <form onSubmit={handleFormSubmit}>
          {error && <p className="text-red-500">{error.general}</p>}
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
            placeholder="Password"
            type="password"
            name="password"
            value={authValues.password}
            onChange={handleAuthChange}
          />
          {error && error.password && <p className="text-red-500">{error.password}</p>}
          <button
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 active:scale-95"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;