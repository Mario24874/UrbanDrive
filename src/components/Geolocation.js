import React, { useEffect, useState } from 'react';
import { realtimeDb } from '../firebase';
import { ref, set } from 'firebase/database';

const Geolocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          set(ref(realtimeDb, 'locations/user-id'), { latitude, longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <h1>Geolocation</h1>
      {location ? (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default Geolocation;