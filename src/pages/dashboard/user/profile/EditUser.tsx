import React, { useState, useEffect } from 'react';
import { useUpdateUserMutation } from '../../../../features/login_slice'; 
import { User } from '../../../../types/types'; 

interface EditUserModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  refetch: ()=>void;
}

const EditUserModal = ({ isOpen, refetch,user, onClose }: EditUserModalProps) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState(user?.contact_phone || '');

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setContactPhone(user?.contact_phone || '');
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ id: user.id, name, email, contact_phone: contactPhone});
    refetch()
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl text-white mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
              autoComplete="name"
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
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-white">Contact Phone</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
              autoComplete="tel"
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
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
