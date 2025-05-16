import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct :React.FC =()=> {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    images: '',
    description: '',
    seller: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('https://e-commerce-back-xy6s.onrender.com/api/v1/products', {
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
    <div className="p-6 max-w-xl mx-auto w-fit">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="lg:w-4/5 w-full p-2 border rounded"
        />
        <input
          name="price"
          type="text"
          step="0.01"
          placeholder="Price"
          value={parseInt( formData.price)}
          onChange={handleChange}
          required
          className="lg:w-4/5 w-full p-2 border rounded"
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="lg:w-4/5 w-full p-2 border rounded"
        />
        <input
          name="stock"
          type="text"
          placeholder="Stock Quantity"
          value={parseInt(formData.stock)}
          onChange={handleChange}
          required
          className="lg:w-4/5 w-full p-2 border rounded"
        />
        <textarea name="description" placeholder="Description..." value={formData.description} onChange={handleChange} required    className="lg:w-4/5 w-full p-2 border rounded"/>
        <input type='text' name='seller' value={formData.seller} placeholder='Seller name' onChange={handleChange} required className="lg:w-4/5 w-full p-2 border rounded"/>

        <input
          name="image"
          type="file"
          placeholder="Image URL"
          value={formData.images}
          onChange={handleChange}
          required
          className="lg:w-4/5 w-full p-2 border rounded"
        />
        <br/>
        <button
          type="submit"
          className="bg-[#634bc1] text-white grid justify-self-center px-4 py-2 rounded hover:bg-[#5239b1]"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
