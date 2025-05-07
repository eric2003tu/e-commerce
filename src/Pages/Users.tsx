import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import AddUser from './AddUser';

function Users() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState<boolean>(false)

  useEffect(function () {
    fetch('https://shopEasy.com/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className = "font-semibold text-lg">User Management</h3>
        <button className={`flex items-center bg-[#634bc1] ${!addUser ? 'bg-[#634bc1]': 'bg-red-400'} text-white px-4 py-2 rounded-lg`} onClick={()=>{
            if(!addUser) setAddUser(true)
            else setAddUser(false)
        }}>
          {!addUser ? <FiPlus className="mr-2" /> : ''} {!addUser ? 'Add User' :'Cancel'}
        </button>
      </div>
      { addUser ? <AddUser/>
      :
      <table className="w-full bg-white rounded-lg shadow-sm border text-sm flex">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-right p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3 text-right">
                <button className="text-[#634bc1] mr-2"><FiEdit /></button>
                <button className="text-red-500"><FiTrash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}

export default Users;
