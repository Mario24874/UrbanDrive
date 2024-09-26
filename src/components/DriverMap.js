// src/components/DriverMap.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Mapbox from './Mapbox';

const DriverMap = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { data, error } = await supabase.from('locations').select('*');
        if (error) {
          throw new Error(error.message);
        }
        setDrivers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const markers = drivers.map(driver => ({
    lng: driver.longitude,
    lat: driver.latitude
  }));

  return (
    <Mapbox initialCenter={{ lng: -34.397, lat: 150.644, zoom: 10 }} markers={markers} />
  );
};

export default DriverMap;