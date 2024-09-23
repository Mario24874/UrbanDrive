import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../supabase';

const Drivers = ({ user, handleSelectDriver }) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchInvitedDrivers = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('invitations')
          .select('driver_id')
          .eq('user_id', user.id)
          .eq('status', 'accepted');
        if (error) {
          console.error(error);
        } else {
          const driverIds = data.map(invitation => invitation.driver_id);
          const { data: driverData, error: driverError } = await supabaseClient
            .from('drivers')
            .select('*')
            .in('id', driverIds);
          if (driverError) {
            console.error(driverError);
          } else {
            setDrivers(driverData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvitedDrivers();
  }, [user.id]);

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