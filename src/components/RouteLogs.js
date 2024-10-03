import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const RouteLogs = ({ selectedDriver }) => {
  const [routeLogs, setRouteLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRouteLogs = async () => {
      if (!selectedDriver) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('route_logs')
          .select('*')
          .eq('driver_id', selectedDriver);

        if (error) {
          throw new Error(error.message);
        }

        setRouteLogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRouteLogs();
  }, [selectedDriver]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-80 rounded-2xl bg-slate-900 bg-opacity-50">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Route Logs</p>
        <ul className="flex flex-col gap-2">
          {routeLogs.map((log) => (
            <li key={log.id} className="p-2 rounded-lg bg-gray-800">
              <p className="text-gray-300">Start: {log.start_latitude}, {log.start_longitude}</p>
              <p className="text-gray-300">End: {log.end_latitude}, {log.end_longitude}</p>
              <p className="text-gray-300">Start Time: {new Date(log.start_time).toLocaleString()}</p>
              <p className="text-gray-300">End Time: {new Date(log.end_time).toLocaleString()}</p>
              <p className="text-gray-300">Average Speed: {log.average_speed} km/h</p>
              <p className="text-gray-300">Distance: {log.distance} km</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RouteLogs;