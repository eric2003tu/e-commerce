import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Product {
  id: number
  title: string
  price: string
  image: string
}

const UploadedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://www.products.com/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error('No Products Uploaded or no network connection', error)
      })
  }, [])

  return (
    <div id='products' className='grid grid-cols-4 gap-4 w-full justify-items-center'>
      {products.length > 0 ? products.map((product) => (
        <div key={product.id} className='grid grid-cols-1 bg-white justify-items-center rounded-lg shadow-md p-4'>
          <img src={product.image} alt={`Image of ${product.title}`} className='object-contain rounded-md' />
          <h1 className='text-lg font-bold mt-2'>{product.title}</h1>
          <p className='text-gray-600'>{product.price}</p>
          <Link 
  to='/signup' 
  className='text-center text-gray-100 p-2 px-4 w-1/2 bg-[#634bc1] rounded-md hover:bg-[#5340a0] transition-colors'
  onClick={() => {
    localStorage.setItem('id',product.id)
  }}
>
  Buy Now
</Link>
        </div>
      )) : (
        <div className='flex justify-center items-center w-full col-span-4 m-7'>
  <h1 className='text-[20px] font-semibold text-gray-500'>No products uploaded yet </h1>
</div>
      )}
    </div>
  )
}

export default UploadedProducts
