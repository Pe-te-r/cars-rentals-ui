import { useState } from 'react';

const VehiclesTable = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, vehicle_id: 'V001', available: true, location: 'Garage A', model: 'Sedan', manufacturer: 'Toyota', fuel_type: 'Petrol', seaters: 5 },
    { id: 2, vehicle_id: 'V002', available: false, location: 'Garage B', model: 'SUV', manufacturer: 'Ford', fuel_type: 'Diesel', seaters: 7 },
    // Add more vehicles as needed
  ]);

  const [editableRowId, setEditableRowId] = useState(null);
  const [editedVehicleId, setEditedVehicleId] = useState('');
  const [editedAvailable, setEditedAvailable] = useState(false);
  const [editedLocation, setEditedLocation] = useState('');
  const [editedModel, setEditedModel] = useState('');
  const [editedManufacturer, setEditedManufacturer] = useState('');
  const [editedFuelType, setEditedFuelType] = useState('');
  const [editedSeaters, setEditedSeaters] = useState(0);

  const handleEditClick = (vehicle: any) => {
    setEditableRowId(vehicle.id);
    setEditedVehicleId(vehicle.vehicle_id);
    setEditedAvailable(vehicle.available);
    setEditedLocation(vehicle.location);
    setEditedModel(vehicle.model);
    setEditedManufacturer(vehicle.manufacturer);
    setEditedFuelType(vehicle.fuel_type);
    setEditedSeaters(vehicle.seaters);
  };

  const handleSaveClick = () => {
    const updatedVehicle = {
      id: editableRowId,
      vehicle_id: editedVehicleId,
      available: editedAvailable,
      location: editedLocation,
      model: editedModel,
      manufacturer: editedManufacturer,
      fuel_type: editedFuelType,
      seaters: editedSeaters,
    };
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === editableRowId ? { ...vehicle, ...updatedVehicle } : vehicle
    );
    setVehicles(updatedVehicles);
    setEditableRowId(null);
  }

  const handleCancelClick = () => {
    setEditableRowId(null);
  };

  const handleDeleteClick = (vehicleId: number) => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);
    setVehicles(updatedVehicles);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-yellow-50 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-yellow-200 text-gray-800">
          <tr>
            <th className="px-4 py-2">Vehicle ID</th>
            <th className="px-4 py-2">Available</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Model</th>
            <th className="px-4 py-2">Manufacturer</th>
            <th className="px-4 py-2">Fuel Type</th>
            <th className="px-4 py-2">Seaters</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="bg-green-800 border-b border-gray-200">
              {editableRowId === vehicle.id ? (
                <>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editedVehicleId}
                      onChange={(e) => setEditedVehicleId(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={editedAvailable}
                      onChange={(e: any) => setEditedAvailable(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editedLocation}
                      onChange={(e) => setEditedLocation(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editedModel}
                      onChange={(e) => setEditedModel(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editedManufacturer}
                      onChange={(e) => setEditedManufacturer(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editedFuelType}
                      onChange={(e) => setEditedFuelType(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={editedSeaters}
                      onChange={(e) => setEditedSeaters(parseInt(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 focus:outline-none"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                    <button
                      className="ml-2 bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 focus:outline-none"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2 text-yellow-500">{vehicle.vehicle_id}</td>
                  <td className="px-4 py-2 text-yellow-500">{vehicle.available ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 text-yellow-500">{vehicle.location}</td>
                  <td className="px-4 py-2 text-yellow-500">{vehicle.model}</td>
                  <td className="px-4 py-2 text-yellow-500">{vehicle.manufacturer}</td>
                  <td className="px-4 py-2 text-yellow-500">{vehicle.fuel_type}</td>
                  <td className="px-4 py-2 text-yellow-500">{vehicle.seaters}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none"
                      onClick={() => handleEditClick(vehicle)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 focus:outline-none"
                      onClick={() => handleDeleteClick(vehicle.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehiclesTable;
