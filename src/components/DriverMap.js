import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Mapbox from './Mapbox';

const DriverMap = () => {  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { data, error } = await supabase.from('locations').select('*');
        if (error) {
          throw new Error(`Error fetching drivers: ${error.message}`);
        }        
        setMarkers(data ? data.map(driver => ({ lng: driver.longitude, lat: driver.latitude })) : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Mapbox initialCenter={{ lng: -34.397, lat: 150.644, zoom: 10 }} markers={markers} />
  );
};

export default DriverMap;