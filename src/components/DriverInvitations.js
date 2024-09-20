import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../supabase';

const DriverInvitations = ({ driver }) => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      const { data, error } = await supabaseClient.from('invitations').select('*').eq('driver_id', driver.id).eq('status', 'pending');
      if (error) {
        console.error(error);
      } else {
        setInvitations(data);
      }
    };
    fetchInvitations();
  }, [driver.id]);

  const handleAccept = async (invitationId) => {
    try {
      const { error } = await supabaseClient.from('invitations').update({ status: 'accepted' }).eq('id', invitationId);
      if (error) {
        console.error(error);
      } else {
        alert('Invitation accepted!');
        setInvitations(invitations.filter(inv => inv.id !== invitationId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (invitationId) => {
    try {
      const { error } = await supabaseClient.from('invitations').update({ status: 'rejected' }).eq('id', invitationId);
      if (error) {
        console.error(error);
      } else {
        alert('Invitation rejected!');
        setInvitations(invitations.filter(inv => inv.id !== invitationId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-80 rounded-2xl bg-slate-900 bg-opacity-50">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Invitations</p>
        <ul className="flex flex-col gap-2">
          {invitations.map((invitation) => (
            <li key={invitation.id} className="p-2 rounded-lg bg-gray-800">
              <p className="text-gray-300">User ID: {invitation.user_id}</p>
              <div className="flex gap-2">
                <button
                  className="inline-block cursor-pointer rounded-md bg-green-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 active:scale-95"
                  onClick={() => handleAccept(invitation.id)}
                >
                  Accept
                </button>
                <button
                  className="inline-block cursor-pointer rounded-md bg-red-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 active:scale-95"
                  onClick={() => handleReject(invitation.id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DriverInvitations;