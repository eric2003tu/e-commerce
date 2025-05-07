import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('https://shopEasy.com/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add product');
        navigate('/products');
      })
      .catch(err => {
        console.error(err);
        setError('Could not add product');
      });
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="image"
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-[#634bc1] text-white px-4 py-2 rounded hover:bg-[#5239b1]"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
