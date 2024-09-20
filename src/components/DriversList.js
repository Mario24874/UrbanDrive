import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../supabase';

const DriversList = ({ user }) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data, error } = await supabaseClient.from('invitations').select('driver_id').eq('user_id', user.id).eq('status', 'accepted');
      if (error) {
        console.error(error);
      } else {
        const driverIds = data.map(invitation => invitation.driver_id);
        const { data: driverData, error: driverError } = await supabaseClient.from('drivers').select('*').in('id', driverIds);
        if (driverError) {
          console.error(driverError);
        } else {
          setDrivers(driverData);
        }
      }
    };
    fetchDrivers();
  }, [user.id]);

  return (
    <div className="w-80 rounded-2xl bg-slate-900 bg-opacity-50">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Your Drivers</p>
        <ul className="flex flex-col gap-2">
          {drivers.map((driver) => (
            <li key={driver.id} className="p-2 rounded-lg bg-gray-800">
              <p className="text-gray-300">Name: {driver.name}</p>
              <p className="text-gray-300">Email: {driver.email}</p>
              <p className="text-gray-300">Phone: {driver.phone}</p>
              <p className="text-gray-300">License Plate: {driver.license_plate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DriversList;