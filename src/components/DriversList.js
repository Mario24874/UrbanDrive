// src/components/DriversList.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const DriversList = ({ user }) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
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

    fetchDrivers();
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