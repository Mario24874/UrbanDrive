import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const Drivers = ({ user, handleSelectDriver }) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvitedDrivers = async () => {
      if (!user || !user.id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const { data: invitations, error: invitationsError } = await supabase
          .from('invitations')
          .select('driver_id')
          .eq('user_id', user.id)
          .eq('status', 'accepted');

        if (invitationsError) {
          throw new Error(invitationsError.message);
        }

        const driverIds = invitations.map(invitation => invitation.driver_id);
        const { data: driverData, error: driverError } = await supabase
          .from('drivers')
          .select('*')
          .in('id', driverIds);

        if (driverError) {
          throw new Error(driverError.message);
        }

        setDrivers(driverData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitedDrivers();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-slate-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Drivers</h2>
      <ul className="mt-4 space-y-2">
        {drivers.map((driver) => (
          <li key={driver.id}>
            <button
              onClick={() => handleSelectDriver(driver.id)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              {driver.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drivers;