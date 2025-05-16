import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import { IoClose } from "react-icons/io5";
import AddUser from './AddUser';
import { User } from '../types/userTypes'; // Assuming you have a type definition file

const Users: React.FC = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addUserModal, setAddUserModal] = useState(false);
  const [role, setRole] = useState<string>('user')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const isLocal = window.location.hostname === 'localhost';
        const apiUrl = isLocal
          ? 'http://localhost:5000/api/v1/users'
          : 'https://e-commerce-back-xy6s.onrender.com/api/v1/users';

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for sending cookies
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const fetchedUsers = data.data || data; // Handle both formats
        setUsers(fetchedUsers);
        localStorage.setItem('allUsers', String(fetchedUsers.length)); // Store after fetch
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

const handleDelete = async (userId: string) => {
  if (!window.confirm('Are you sure you want to delete this user?')) return;
  
  try {
    const isLocal = window.location.hostname === 'localhost';
    const apiUrl = isLocal
      ? `http://localhost:5000/api/v1/users/${userId}`
      : `https://e-commerce-back-xy6s.onrender.com/api/v1/users/${userId}`;

    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    // Update the local state to remove the deleted user
    setUsers(users.filter(user => user.id !== userId));
    
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
    setError(errorMessage);
    console.error('Error deleting user:', err);
  }
};

const handleUpdate =async (userId: string) => {
  if (!window.confirm('Are you sure you want to update this user?')) return;
  const isLocal = window.location.hostname === 'localhost';
  const apiUrl = isLocal
    ? `http://localhost:5000/api/v1/users/${userId}`
    : `https://e-commerce-back-xy6s.onrender.com/api/v1/users/${userId}`;
  
 fetch(apiUrl, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    role: role !== 'admin'? 'user' : 'admin' // Fixed ternary syntax
  })
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log("User role updated successfully", data);
    // You might want to update the UI or state here
  })
  .catch((error) => {
    console.error("Error updating user role:", error.message);
  });
};
  

  return (
    <div className="py-6 w-full relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#634bc1]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <button 
            className="flex items-center bg-[#634bc1] hover:bg-[#5340a1] text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() => setAddUserModal(true)}
          >
            <FiPlus className="mr-2" /> Add User
          </button>
        </div>
      </div>
      
      {addUserModal && (
        <div className="fixed inset-0 bg-gray-900/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setAddUserModal(false)}
            >
              <IoClose size={24} />
            </button>
            <AddUser 
              onSuccess={(newUser) => {
                setUsers([...users, newUser]);
                setAddUserModal(false);
              }} 
            />
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#634bc1]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    {users.length === 0 ? 'No users found' : 'No matching users found'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.phone || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.address ? `${user.address.line1}, ${user.address.city}, ${user.address.state}` : '-'}
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-[#634bc1] hover:text-[#5340a1] mr-4"
                        onClick={() =>handleUpdate(user.id)} // Implement edit functionality
                      >
                        <FiEdit size={18} />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(user.id)}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;