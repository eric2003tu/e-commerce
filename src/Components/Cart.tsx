import React, { useEffect, useState } from 'react'
import Header from '../Small/Header'
import Footer from '../Small/Footer'

interface cart {
  id: string,
  title: string,
  price: string,
  image: string
}

const Cart: React.FC = () => {
  const [added, setAdded] = useState<cart[]>([])
  const [warning, setWarning] = useState<string>('')
  const [warningColor, setWarningColor] = useState<string>('blue')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [qty,setQty] = useState<number>(1)

  useEffect(() => {
    setIsLoading(true)
    fetch('https://www.e-commerce.com/api/cart')
      .then((response) => response.json())
      .then((data) => {
        setAdded(data)
        setIsLoading(false)
        setWarning('')
      })
      .catch((error) => {
        console.error('Failed to add to cart, check your internet connection', error)
        setWarning('Failed to load cart, check your internet connection')
        setWarningColor('red')
        setIsLoading(false)
      })
  }, [])

  return (
    <div className='grid grid-cols-1 gap-5 justify-items-center min-h-screen text-center '>
      <Header />
      <h1 className='text-[#634bc1] text-3xl font-bold'>
    Welcome to ShopEasy
  </h1>
      {warning && (
        <p className={`text-${warningColor}-600 text-center font-medium`}>
          {warning}
        </p>
      )}

      {isLoading ? (
        <div className='flex justify-center items-center m-7'>
          <div className='animate-spin rounded-full h-10 w-10 border-b-3 border-blue-500'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 w-full gap-6 px-5'>
          {added.map((product) => (
            <div key={product.id} className='border rounded-lg p-4 shadow-sm grid grid-cols-2'>
              <div className='w-fit flex flex-row'>
              <img src={product.image} alt={`Image of ${product.title}`} className='object-contain rounded-md h-40 w-full mb-2' />
              <div className='flex flex-col gap-2'>
              <h1 className='text-lg font-bold'>{product.title}</h1>
              <p className='text-gray-600'>{product.price}</p>
              </div>
              </div>
              <div className='grid grid-cols-4 gap-2 justify-items-end justify-self-end right-2'>
                <button className='bg-[#634bc1] rounded-full w-fit p-3 text-white text-[20px]' onClick={()=>{
                  if(qty >1 ) setQty(qty - 1)
                }}>-</button>
                <input type='text' name='qty' value={qty} onChange={(e)=>{
                  setQty(e.target.value)
                }}/>
                 <button className='bg-[#634bc1] rounded-full w-fit p-3 text-white text-[20px]'  onClick={()=>{
                  setQty((qty + 1))
                }}>+</button>
                <button className='bg-red-500 text-white p-2' >Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Cart
