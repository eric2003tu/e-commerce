import React, { useEffect, useState } from 'react'
import Header from '../Small/Header'
import Footer from '../Small/Footer'
import Search from '../Small/Search';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [warning, setWarning] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    setIsLoading(true);
    fetch('https://www.e-commerce.com/api/cart')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load cart');
        }
        return response.json();
      })
      .then((data: CartItem[]) => {
        setCartItems(data);
        // Initialize quantities
        const initialQuantities = data.reduce((acc, item) => {
          acc[item.id] = 1;
          return acc;
        }, {} as Record<string, number>);
        setQuantities(initialQuantities);
      })
      .catch((error) => {
        console.error('Error:', error);
        setWarning('Failed to load cart, check your internet connection');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleQuantityChange = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setQuantities(prev => ({
      ...prev,
      [id]: newQty
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    // In a real app, you'd also call API to remove from server
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (quantities[item.id] || 1));
    }, 0).toFixed(2);
  };

  return (
    <div className='grid grid-cols-1 gap-5 justify-items-center min-h-screen text-center'>
      <Header />
      <h1 className='text-[#634bc1] text-3xl font-bold'>
        Welcome to ShopEasy
      </h1>
{/*       
      {warning && (
        <p className={`${warning.includes('Failed') ? 'text-red-600' : 'text-blue-600'} text-center font-medium`}>
          {warning}
        </p>
      )} */}
        <div className='grid grid-cols-1 gap-6 bg-white px-8 l:w-3/5 pt-15 rounded-lg shadow-md justify-items-center pb-4'>
  <h1 className='text-[#634bc1] text-3xl font-bold'>
    Welcome to ShopEasy
  </h1>
    <p className='leading-9'>
    Your one-stop shop for everything you need! Explore our wide range of products, exclusive deals,<br/> and seamless shopping experience.
    </p>
      <Link to='/products' className='text-center text-gray-100 p-2 px-8 w-fit bg-[#634bc1] rounded-md'>Start Shopping</Link>
      <Search/>
  </div>
  <h1 className='text-[#634bc1] text-3xl font-bold'>
  Start Your purchase today
  </h1>

      {isLoading ? (
        <div className='flex justify-center items-center mx-7'>
          <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-[#634bc1]'></div>
        </div>
      ) : cartItems.length === 0 ? (
        <p className='text-gray-500 text-lg'>Your cart is empty</p>
      ) : (
        <div className='grid grid-cols-1 w-full gap-4 px-5'>
          {cartItems.map((item) => (
            <div key={item.id} className='border rounded-lg p-4 shadow-sm grid grid-cols-2'>
              <div className='flex items-center gap-4'>
                <img 
                  src={item.image} 
                  alt={`Image of ${item.title}`} 
                  className='object-contain rounded-md h-40 w-40' 
                />
                <div className='flex flex-col gap-2 text-left'>
                  <h1 className='text-lg font-bold'>{item.title}</h1>
                  <p className='text-gray-600'>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className='flex items-center justify-end gap-4'>
                <div className='flex items-center gap-2'>
                  <button 
                    className='bg-[#634bc1] rounded-full w-10 h-10 text-white text-xl flex items-center justify-center'
                    onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) - 1)}
                  >
                    -
                  </button>
                  <input 
                    type='number' 
                    min='1'
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    className='w-16 text-center border rounded py-1'
                  />
                  <button 
                    className='bg-[#634bc1] rounded-full w-10 h-10 text-white text-xl flex items-center justify-center'
                    onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className='flex justify-end mt-8'>
            <div className='bg-gray-100 p-4 rounded-lg w-64'>
              <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
              <div className='flex justify-between mb-2'>
                <span>Subtotal:</span>
                <span>${calculateTotal()}</span>
              </div>
              <button className='w-full bg-[#634bc1] text-white py-2 rounded hover:bg-[#5340a0] mt-4'>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;