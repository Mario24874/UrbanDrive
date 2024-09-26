// src/components/DriverMap.js
import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { supabase } from '../supabase';

const center = {
  latitude: -34.397,
  longitude: 150.644,
};

const DriverMap = () => {
  const [drivers, setDrivers] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 10,
    width: '100%',
    height: '400px',
  });

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data, error } = await supabase.from('locations').select('*');
      if (error) {
        console.error(error);
      } else {
        setDrivers(data);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {drivers.map((driver) => (
        <Marker
          key={driver.id}
          latitude={driver.latitude}
          longitude={driver.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div style={{ color: 'red', fontSize: '20px' }}>📍</div>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default DriverMap;