// src/components/InviteDriver.js
import React, { useState } from 'react';
import { supabase } from '../supabase';

const InviteDriver = ({ user }) => {
  const [driverEmail, setDriverEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data: driverData, error: driverError } = await supabase
        .from('drivers')
        .select('id')
        .eq('email', driverEmail)
        .single();

      if (driverError) {
        throw new Error(driverError.message);
      }

      if (!driverData) {
        throw new Error('Driver not found!');
      }

      const { error: invitationError } = await supabase
        .from('invitations')
        .insert([{ user_id: user.id, driver_id: driverData.id }]);

      if (invitationError) {
        throw new Error(invitationError.message);
      }

      setSuccess(true);
      setDriverEmail('');
      alert('Invitation sent successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 rounded-2xl bg-slate-900 bg-opacity-50">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Invite Driver</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Invitation sent successfully!</p>}
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Driver Email"
            type="email"
            value={driverEmail}
            onChange={(e) => setDriverEmail(e.target.value)}
          />
          <button
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Invite'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteDriver;