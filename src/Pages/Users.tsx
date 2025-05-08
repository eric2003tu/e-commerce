import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import AddUser from './AddUser';
import { IoClose } from "react-icons/io5";

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
    <div className={`py-6 w-full relative `}>
      <div className="flex items-center justify-between mb-6 w-full">
        <h3 className ="text-2xl font-bold">User Management</h3>
        <button className={`flex items-center bg-[#634bc1] text-white cursor-pointer  px-4 py-2 rounded-lg`} onClick={()=>{
            if(!addUser) setAddUser(true)
        }}>
          <FiPlus className="mr-2" /> Add User
        </button>
      </div>
      <div className={addUser ? 'flex flex-row max-w-fit h-fit self-end absolute lg:top-4 top-1 lg:ml-45  rounded-lg shadow-lg bg-white' : 'hidden'}>
        
      <AddUser/>
      <IoClose size={30} className='text-white hover:bg-red-700 transition-colors bg-red-400 duration-500 ease-in-out rounded-l-full cursor-pointer' onClick={()=>{
          setAddUser(false)
        }}/>
        </div>
      <div className='overflow-x-auto'>
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-right p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No Users found.</td>
              </tr>
            ) : (
          filteredUsers.map(user => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3 text-right">
                <button className="text-[#634bc1] mr-2"><FiEdit /></button>
                <button className="text-red-500"><FiTrash2 /></button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Users;
