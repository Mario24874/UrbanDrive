import React, { useEffect, useState } from 'react';
import { createSupabaseClient } from '../supabase';

const UserInvitations = ({ user }) => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      const supabaseClient = await createSupabaseClient();
      const { data, error } = await supabaseClient.from('invitations').select('*').eq('user_id', user.id);
      if (error) {
        console.error(error);
      } else {
        setInvitations(data);
      }
    };
    fetchInvitations();
  }, [user.id]);

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