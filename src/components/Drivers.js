import React from 'react';

const Drivers = ({ drivers, handleSelectDriver }) => {
  return (
    <div className="bg-slate-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Drivers</h2>
      <ul className="mt-4 space-y-2">
        {drivers.map((driver) => (
          <li key={driver.id}>
            <button
              onClick={() => handleSelectDriver(driver.id)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              {driver.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drivers;