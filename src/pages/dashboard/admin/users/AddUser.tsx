import { useEffect, useState } from 'react';
import { useRegisterMutation } from '../../../../features/login_slice';
import { useToast } from '../../../../context/smallToast';

const AddUserModal = ({ isOpen, refetch,onClose }: any) => {
  const [registerUser, { isLoading ,isSuccess,data}] = useRegisterMutation();
    const {addToast} = useToast()
    const [name,setName]=useState('')
    const [email, setEmail]=useState('')
    const [role,setRole]=useState('')
    const [password, setPassword]=useState('')
      const [contact, setContact] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userInfo: any = {
        email,
        password,
        name,
        role,
        contact_phone: contact,
    };
    await registerUser(userInfo);
  };
  useEffect(()=>{
    if(isSuccess && data.username !== undefined){
      console.log(data.username)
      onClose(); 
      addToast(`${data.username} successfully registered`,'success');
      refetch()
    }
  },[data,isSuccess])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl text-white mb-4">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white">Contact Phone</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-500 ${isLoading ? 'opacity-50' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
