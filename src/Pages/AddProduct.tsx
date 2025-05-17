import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  price: string;
  category: string;
  stock: string;
  images: File[];
  description: string;
  seller: string;
}

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    category: '',
    stock: '',
    images: [],
    description: '',
    seller: ''
  });

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('')
  const [color, setColor] = useState<string>('red')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('seller', formData.seller);
      
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });

    const isLocal = window.location.hostname === 'localhost';
    const apiUrl = isLocal
    ? `http://localhost:5000/api/v1/products`
    : `https://e-commerce-back-xy6s.onrender.com/api/v1/products`;
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        setMessage('Failed to add the product')
        setColor('red')
        setTimeout(()=>{
          setMessage('')
        },4000)
        throw new Error('Failed to add product');
      }

      setMessage('product Added successfuly')
      setColor('green')
      setTimeout(()=>{
      setMessage('')
      navigate('/admin');
        },4000)
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Could not add product');
       setMessage('Could not add the product')
       setColor('red')
      setTimeout(()=>{
      setMessage('')
        },4000)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto w-fit">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 style={{color : color}}>{message}</h1>
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
          type="number"
          placeholder="Price"
          value={formData.price}
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
          type="number"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          required
          className="lg:w-4/5 w-full p-2 border rounded"
        />
        <textarea 
          name="description" 
          placeholder="Description..." 
          value={formData.description} 
          onChange={handleChange} 
          required
          className="lg:w-4/5 w-full p-2 border rounded"
        />
        <input 
          type="text" 
          name="seller" 
          value={formData.seller} 
          placeholder="Seller name" 
          onChange={handleChange} 
          required 
          className="lg:w-4/5 w-full p-2 border rounded"
        />

        <input
          name="images"
          type="file"
          onChange={handleImageChange}
          multiple
          required
          accept="image/*"
          className="lg:w-4/5 w-full p-2 border rounded"
        />
        <br />
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-[#634bc1] text-white grid justify-self-center px-4 w-full py-2 rounded hover:bg-[#5239b1] ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;