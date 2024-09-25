// src/components/Locations.js
import React from 'react';

const Locations = ({ locations, selectedDriver }) => {
  // Verificar si selectedDriver es null o undefined
  if (!selectedDriver) {
    return (
      <div className="bg-slate-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Location</h2>
        <p className="mt-4 text-gray-300">No driver selected</p>
      </div>
    );
  }

  // Obtener la ubicación del conductor seleccionado
  const location = locations[selectedDriver];

  return (
    <div className="bg-slate-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Location</h2>
      {location ? (
        <p className="mt-4 text-gray-300">
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p className="mt-4 text-gray-300">No location available</p>
      )}
    </div>
  );
};

export default Locations;