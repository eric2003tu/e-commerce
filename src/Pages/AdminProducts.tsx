import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AddProduct from './AddProduct';
import { IoClose } from "react-icons/io5";

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [addProduct,setAddProduct] = useState<boolean>(false)

  useEffect(function () {
    fetch('https://shopEasy.com/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setError('');
      })
      .catch(err => {
        console.error(err);
        setError('Could not load products.');
      });
  }, []);

  function deleteProduct(id) {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    fetch(`https://shopEasy.com/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete product');
        setProducts(products.filter(p => p.id !== id));
      })
      .catch(err => {
        console.error(err);
        alert('Error deleting product');
      });
  }

  return (
    <div className={`py-6 w-ful relative`}>
      <div className="flex items-center justify-between mb-6 w-full">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className={`flex items-center bg-[#634bc1] text-white cursor-pointer  px-4 py-2 rounded-lg`} onClick={()=>{
            if (!addProduct) setAddProduct(true)
          }}>
          <FiPlus className="mr-2" />Add Product
        </button>
      </div>
     <div className={addProduct ? 'flex flex-row max-w-fit h-fit self-end absolute lg:top-4 top-1 lg:ml-45  rounded-lg shadow-lg bg-white' : 'hidden'}>
        
        <AddProduct/>
        <IoClose size={30} className='text-white hover:bg-red-700 transition-colors bg-red-400 duration-500 ease-in-out rounded-l-full cursor-pointer' onClick={()=>{
          setAddProduct(false)
        }}/>
        </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No products found.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-2 border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">${product.price}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border">{product.stock}</td>
                  <td className="px-4 py-2 border flex gap-3">
                    <Link
                      to={`/edit-product/${product.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FiEdit />
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
