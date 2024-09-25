import React, { useState } from 'react';
import { supabase } from '../supabase';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) {
        console.error('Error logging in:', error.message);
        alert('Error logging in.');
      } else {
        // Verificar si el usuario ya existe en la tabla `users`
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single();

        if (selectError) {
          console.error('Error checking user existence:', selectError.message);
          alert('Error checking user existence.');
        } else if (!existingUser) {
          // Si el usuario no existe, mostrar un mensaje indicando que no se ha registrado
          alert('User not registered. Please register first.');
        } else {
          handleLogin({ user, email, password });
          alert('Login successful!');
          // Clear form inputs
          setEmail('');
          setPassword('');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('Error logging in.');
    }
  };

  return (
    <div className="w-80 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-50">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Login</p>
        <form onSubmit={handleSubmit}>
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;