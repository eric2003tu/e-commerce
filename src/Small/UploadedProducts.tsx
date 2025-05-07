import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Product {
  id: string,
  title: string,
  price: string,
  image: string
}

const UploadedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [warning, setWarning] = useState<string>('')
  const [warningColor, setWarningColor] = useState<string>('blue')

  useEffect(() => {
    setIsLoading(true)
    fetch('https://www.products.com/api/products')
      .then((response) => {
        return response.json()  // ✅ Return response.json()
      })
      .then((data) => {
        setProducts(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('No Products Uploaded or no network connection', error)
        setWarning('No Products Uploaded or no network connection')
        setWarningColor('red')
        setIsLoading(false)
      })
  }, [])

  return (
    <div id='products' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full justify-items-center px-4'>
      
      {warning && (
        <p className={`text-${warningColor}-600 text-center font-medium col-span-full`}>
          {warning}
        </p>
      )}

      {isLoading ? (
        <div className='flex items-center justify-center col-span-full my-7'>
          <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500'></div>
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} className='bg-white rounded-lg shadow-md p-4 w-full max-w-xs'>
            <img src={product.image} alt={`Image of ${product.title}`} className='object-contain h-40 w-full rounded-md mb-2' />
            <h1 className='text-lg font-bold'>{product.title}</h1>
            <p className='text-gray-600 mb-3'>{product.price}</p>
            <Link 
              to='/signup' 
              className='block text-center text-white p-2 px-4 bg-[#634bc1] rounded-md hover:bg-[#5340a0] transition-colors'
              onClick={() => localStorage.setItem('id', product.id)}
            >
              View More
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default UploadedProducts
