import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiInfo } from 'react-icons/fi';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  featured?: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/v1' 
    : 'https://e-commerce-back-xy6s.onrender.com/api/v1');

const UploadedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_BASE}/products`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || 
            `Failed to fetch products (HTTP ${response.status})`
          );
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
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 min-w-screen sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="bg-gray-200 h-48 w-full"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <FiAlertCircle className="text-red-500 text-4xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Products</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <FiInfo className="text-blue-500 text-4xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Products Available</h2>
        <p className="text-gray-600">Check back later or add new products</p>
      </div>
    );
  }

  return (
    <div id="products" className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => {
        // Use the first image or fallback
        const imageUrl = product.images[0] || '/placeholder-product.jpg';
        
        return (
          <div 
            key={product._id} 
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 ${
              product.featured ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="relative w-full" >
              <img
                src={imageUrl}
                alt={product.name}
                className="min-w-full h-48 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                }}
              />
              {product.featured && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Featured
                </span>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                  {product.name}
                </h3>
              </div>
              
              
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                <span className={`text-sm ${
                  product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
              
              <button
                onClick={() => handleProductClick(product)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UploadedProducts;