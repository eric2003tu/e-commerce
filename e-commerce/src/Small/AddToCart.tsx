import React, { useState, useEffect } from 'react'

interface Product {
  id: number
  title: string
  price: string
  image: string
  description: string
}

const AddToCart: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null)
  const [warning,setWarning] = useState<string>('')

  useEffect(() => {
    const currentProduct = localStorage.getItem('id')
    if (currentProduct) {
      fetch(`https://www.products.com/api/products/${currentProduct}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => {
          console.error('No Products Uploaded or no network connection', error)
        })
    }
  }, [])
  const addingToCart = (event)=>{
    event.preventDefault()
    fetch('https://www.products.com/api/products/cart',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: product?.title,
            price: product?.price,
            image: product?.image

        })
  })
  .then((response)=>{
    return response.json()
  })
  .then((data)=>{
    if(data){
        setWarning('Product added to cart')
    }
  })
  .catch((error) => {
    console.error('No Products added to cart', error)
    setWarning('No Products added to cart')
  })
  }

  if (!product) {
    return (
      <div className='flex justify-center items-center h-[50vh] w-full'>
        <p className='text-gray-500'>Loading product...</p>
      </div>
    )
  }

  return (
    <div className='w-2/3 mx-auto bg-white rounded-lg shadow-md p-6 grid grid-cols-2 gap-6'>
      <img src={product.image} alt={`Image of ${product.title}`} className='object-contain rounded-md w-full' />
      <div className='flex flex-col gap-3'>
        <h1 className='text-3xl font-bold text-[#634bc1]'>{product.title}</h1>
        <p>{product.description}</p>
        <p className='text-[#634bc1] font-semibold'>{product.price}</p>
        <button
          className='text-center text-white p-2 px-4 w-1/2 bg-[#634bc1] rounded-md hover:bg-[#5340a0] transition-colors'  onClick={addingToCart}>
          Buy Now
        </button>
        <h1 className='text-[#634bc1]'>{warning}</h1>
      </div>
    </div>
  )
}

export default AddToCart
