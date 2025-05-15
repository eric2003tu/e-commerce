import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  stock: number;
}

const UploadedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://e-commerce-back-xy6s.onrender.com/api/products');
        
        if (!response.ok) {
          // Handle different HTTP status codes
          if (response.status === 404) {
            throw new Error('API endpoint not found (404)');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div id='products' className='grid grid-cols-1 lg:grid-cols-4 gap-4 w-full justify-items-center px-4'>
      {error && (
        <div className="col-span-full text-center p-4">
          <p className="text-red-600 font-medium">Error: {error}</p>
          <p className="text-gray-600 mt-2">
            Please check the API endpoint or try again later.
          </p>
        </div>
      )}

      {isLoading ? (
        <div className='flex items-center justify-center col-span-full my-7'>
          <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500'></div>
        </div>
      ) : products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className='bg-white rounded-lg shadow-md p-4 w-full max-w-xs'>
            <img 
              src={product.imageUrl} 
              alt={`Image of ${product.name}`} 
              className='object-contain h-40 w-full rounded-md mb-2' 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'path/to/fallback/image.jpg';
              }}
            />
            <h1 className='text-lg font-bold'>{product.name}</h1>
            <p className='text-gray-600 mb-3'>{product.price}</p>
            <p className='text-gray-600 mb-3'>Stock: {product.stock}</p>
            <button 
              className='block text-center text-white p-2 px-4 bg-[#634bc1] rounded-md hover:bg-[#5340a0] transition-colors duration-500 ease-in-out w-full'
              onClick={() => localStorage.setItem('productId', product.id)}
            >
              View More
            </button>
          </div>
        ))
      ) : (
        !error && (
          <div className="col-span-full text-center p-4">
            <p className="text-gray-600">No products available</p>
          </div>
        )
      )}
    </div>
  );
};

export default UploadedProducts;