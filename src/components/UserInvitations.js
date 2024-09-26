// src/components/UserInvitations.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const UserInvitations = ({ user }) => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const { data, error } = await supabase
          .from('invitations')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          throw new Error(error.message);
        }

        setInvitations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, [user.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-80 rounded-2xl bg-slate-900 bg-opacity-50">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Your Invitations</p>
        <ul className="flex flex-col gap-2">
          {invitations.map((invitation) => (
            <li key={invitation.id} className="p-2 rounded-lg bg-gray-800">
              <p className="text-gray-300">Driver ID: {invitation.driver_id}</p>
              <p className="text-gray-300">Status: {invitation.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInvitations;