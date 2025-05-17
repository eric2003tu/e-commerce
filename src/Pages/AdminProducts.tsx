import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import AddProduct from './AddProduct';
import ProductSkeleton from './ProductSkeleton';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  description?: string;
  featured?: boolean;
  seller: string;
}

const API_BASE = import.meta.env.VITE_API_BASE || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/v1' 
    : 'https://e-commerce-back-xy6s.onrender.com/api/v1');

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_BASE}/products`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const { products: fetchedProducts } = await response.json();
        
        // Transform image paths to full URLs
        const productsWithImageUrls = fetchedProducts.map((product: Product) => ({
          ...product,
          images: product.images.map(image => 
            image.startsWith('http') ? image : `${API_BASE.replace('/api/v1', '')}${image}`
          )
        }));
        
        setProducts(productsWithImageUrls || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setDeletingId(id);
    
    try {
      const response = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  const handleProductAdded = (newProduct: Product) => {
    // Ensure new product images have proper URLs
    const productWithUrls = {
      ...newProduct,
      images: newProduct.images.map(image => 
        image.startsWith('http') ? image : `${API_BASE.replace('/api/v1', '')}${image}`
      )
    };
    setProducts(prev => [...prev, productWithUrls]);
    setAddProductOpen(false);
  };

  const closeModal = () => setAddProductOpen(false);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={() => setAddProductOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          aria-label="Add new product"
        >
          <FiPlus size={18} />
          Add Product
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <ProductSkeleton count={5} />
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {error ? 'Error loading products' : 'No products found.'}
            </p>
            <button
              onClick={() => setAddProductOpen(true)}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Add your first product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => {
                  const imageUrl = product.images[0] || '/placeholder-product.jpg';
                  return (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded object-cover"
                            src={imageUrl}
                            alt={product.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        {product.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {product.seller}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-green-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock > 0 ? (
                          <span className="text-green-600">{product.stock} in stock</span>
                        ) : (
                          <span className="text-red-600">Out of stock</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link
                            to={`/edit-product/${product._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                            aria-label={`Edit ${product.name}`}
                          >
                            <FiEdit size={18} />
                          </Link>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            disabled={deletingId === product._id}
                            className={`text-red-600 hover:text-red-900 ${deletingId === product._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-label={`Delete ${product.name}`}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {addProductOpen && (
        <div className="fixed inset-0 bg-gray-900/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setAddProductOpen(false)}
            >
              <IoClose size={24} />
            </button>
            <AddProduct />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;