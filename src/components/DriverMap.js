import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { realtimeDb } from '../firebase';
import { ref, onValue } from 'firebase/database';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const DriverMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const driversRef = ref(realtimeDb, 'locations');
    onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const driversArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setDrivers(driversArray);
      }
    });
  }, []);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {drivers.map((driver) => (
        <Marker
          key={driver.id}
          position={{ lat: driver.latitude, lng: driver.longitude }}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default DriverMap;