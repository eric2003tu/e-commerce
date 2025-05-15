import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AddProduct from './AddProduct';
import { IoClose } from "react-icons/io5";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);

  useEffect(function () {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://shopEasy.com/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Could not load products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  async function deleteProduct(id: string) {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`https://shopEasy.com/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    }
  }

  const closeModal = () => setAddProductOpen(false);

  return (
    <div className="py-6 w-full relative">
      <div className="flex items-center justify-between mb-6 w-full">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className="flex items-center bg-[#634bc1] text-white cursor-pointer px-4 py-2 rounded-lg"
          onClick={() => setAddProductOpen(true)}
        >
          <FiPlus className="mr-2" />Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : (
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
                  <td colSpan="6" className="text-center py-4">
                    {error ? 'Error loading products' : 'No products found.'}
                  </td>
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
                    <td className="px-4 py-2 border">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-2 border">{product.category}</td>
                    <td className="px-4 py-2 border">{product.stock}</td>
                    <td className="px-4 py-2 border flex gap-3">
                      <Link
                        to={`/edit-product/${product.id}`}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label={`Edit ${product.name}`}
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Delete ${product.name}`}
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
      )}

      {/* Modal */}
      {addProductOpen && (
        <div 
          className="grid grid-cols-1 fixed inset-0 bg-gray-900/60 bg-opacity-50  items-center justify-items-center z-50"
          onClick={closeModal}
        >
          <div 
            className=" grid grid-cols-1 justify-self-center justify-items-center bg-white rounded-lg shadow-lg p-6 relative max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <IoClose size={24} />
            </button>
            <AddProduct 
              onClose={closeModal} 
              onProductAdded={(newProduct) => {
                setProducts([...products, newProduct]);
                closeModal();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;