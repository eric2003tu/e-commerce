import React, { useState } from 'react';

function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('https://shopEasy.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add user');
        return res.json();
      })
      .then((data) => {
        setSuccess('User added successfully!');
        setError('');
        setFormData({ name: '', email: '', role: '' });
      })
      .catch(err => {
        setError('Something went wrong.');
        setSuccess('');
        console.error(err);
      });
  }

  return (
    <div className=" w-fulllg:max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Add New User</h2>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="role"
          placeholder="Role (e.g. admin, user)"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#634bc1] text-white py-2 rounded hover:bg-[#553bb5]"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
