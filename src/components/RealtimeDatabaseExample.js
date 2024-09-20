import React, { useEffect, useState } from 'react';
import { realtimeDb } from '../firebase';
import { ref, onValue, set } from 'firebase/database';

const RealtimeDatabaseExample = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dataRef = ref(realtimeDb, 'your-path');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  const updateData = async () => {
    try {
      await set(ref(realtimeDb, 'your-path'), {
        message: 'Hello, Realtime Database!',
      });
      alert('Data updated successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Realtime Database Example</h1>
      <button onClick={updateData}>Update Data</button>
      {data && (
        <div>
          <p>Data: {JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
};

export default RealtimeDatabaseExample;