import React, { useState } from 'react';

const Register = ({ handleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [userType, setUserType] = useState('user'); // 'user' or 'driver'

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ email, password, confirmPassword, acceptTerms, userType });
  };

  return (
    <div className="w-80 rounded-2xl bg-slate-900 bg-opacity-50">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Register</p>
        <input
          className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
          Accept terms of use
          <div className="relative inline-block">
            <input
              className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gray-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
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
              checked={userType === 'user'}
              onChange={(e) => setUserType(e.target.value)}
            />
            <span className="ml-2 text-gray-300">User</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="userType"
              value="driver"
              checked={userType === 'driver'}
              onChange={(e) => setUserType(e.target.value)}
            />
            <span className="ml-2 text-gray-300">Driver</span>
          </label>
        </div>
        <button
          className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;