
import { useState } from 'react';

const UsersTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', car_hired_id: 'ABC123', returned_car: true },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', car_hired_id: 'XYZ456', returned_car: false },
    { id: 3, name: 'Jane Smith', email: 'jane.smith@example.com', car_hired_id: 'XYZ456', returned_car: false },
    { id: 4, name: 'Jane Smith', email: 'jane.smith@example.com', car_hired_id: 'XYZ456', returned_car: false },
    { id: 5, name: 'Jane Smith', email: 'jane.smith@example.com', car_hired_id: 'XYZ456', returned_car: false },
    { id: 6, name: 'Jane Smith', email: 'jane.smith@example.com', car_hired_id: 'XYZ456', returned_car: false },
    { id: 7, name: 'Jane Smith', email: 'jane.smith@example.com', car_hired_id: 'XYZ456', returned_car: false },
    // Add more users as needed
  ]);

  const [editableRowId, setEditableRowId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedCarId, setEditedCarId] = useState('');
  const [editedReturnedCar, setEditedReturnedCar] = useState('');

  const handleEditClick = (user: any) => {
    setEditableRowId(user.id);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedCarId(user.car_hired_id);
    setEditedReturnedCar(user.returned_car);
  };

  const handleSaveClick = () => {
    const updatedUser = {
      id: editableRowId,
      name: editedName,
      email: editedEmail,
      car_hired_id: editedCarId,
      returned_car: editedReturnedCar,
    };
    const updatedUsers = users.map((user) =>
      user.id === editableRowId ? { ...user, ...updatedUser } : user
    ) as typeof users;
    setUsers(updatedUsers);
    setEditableRowId(null);
  };
  

  const handleCancelClick = () => {
    setEditableRowId(null);
  };

  const handleDeleteClick = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-yellow-50 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-yellow-200 text-gray-800">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Car Hired ID</th>
            <th className="px-4 py-2">Returned Car</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-green-800 border-b border-gray-200">
              {editableRowId === user.id ? (
                <>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editedCarId}
                      onChange={(e) => setEditedCarId(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editedReturnedCar ? 'Yes' : 'No'}
                      onChange={(e) => setEditedReturnedCar(e.target.value)}
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
                  <td className="px-4 py-2 text-yellow-500">{user.name}</td>
                  <td className="px-4 py-2 text-yellow-500">{user.email}</td>
                  <td className="px-4 py-2 text-yellow-500">{user.car_hired_id}</td>
                  <td className="px-4 py-2 text-yellow-500">{user.returned_car ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 focus:outline-none"
                      onClick={() => handleDeleteClick(user.id)}
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

export default UsersTable;
;
