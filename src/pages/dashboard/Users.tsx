import {  useState } from 'react';
import { useDeleteUserMutation, useFetchAllUsersMutation, useUpdateUserMutation } from '../../features/login_slice';
import { User } from '../../types/types';

const UsersTable = () => {
  
  const {data,error, isLoading}  = useFetchAllUsersMutation();
  const [ updateUser]=useUpdateUserMutation() 
  const [deleting]=useDeleteUserMutation()


  console.log(data)
  
  console.log(error)
  console.log(isLoading)
  const [users, setUsers] = useState(data);

  const [editableRowId, setEditableRowId] = useState<number>(-1);
  const [editName,setEditedName]=useState('')
  const [editRole,setEditRole]=useState('')
  const [editEmail,setEditEmail]=useState('')
  const [editContact,setEditContact]=useState('')

  
  const handleEditClick = (user:User) =>{
    setEditableRowId(Number(user.id));
    setEditedName(user.name);
    setEditRole(user.role);
    setEditEmail(user.email);
    setEditContact(user.contact_phone);
  }
  const handleDeleteClick = (id: string) =>{
    const updatedUsers = users?.filter((user) => user.id!== id);
    setUsers(updatedUsers);
    deleting({id:id})

  }
  const handleCancelClick = () =>{
    setEditableRowId(-1);
  }
  const handleSaveClick = () =>{
    const info ={
      id:editableRowId.toString(),
      name:editName,
      role:editRole,
      email:editEmail,
      contact_phone:editContact,
    }
     updateUser(info)
     setEditableRowId(-1)
  }

  return (
    
     <div className="overflow-x-auto">
      <table className="min-w-full bg-yellow-50 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-yellow-200 text-gray-800">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="bg-green-800 border-b border-gray-200">
              {Number(editableRowId) === Number(user.id) ? (
                <>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editContact}
                      onChange={(e) => setEditContact(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
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
                  <td className="px-4 py-2 text-yellow-500">{user.contact_phone}</td>
                  <td className="px-4 py-2 text-yellow-500">{user.role}</td>
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
