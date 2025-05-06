import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Small/Footer'
import Header from '../Small/Header'
import UploadedProducts from '../Small/UploadedProducts'

const Products :React.FC = () => {
  
  return (
<div className=' grid grid-cols-1 justify-items-center min-h-screen w-full text-center '>
  <Header/>
  <div className='grid grid-cols-1 gap-6 bg-white px-8 w-3/5 rounded-lg shadow-md justify-items-center  pt-7 pb-4'>
  <h1 className='text-[#634bc1] text-3xl font-bold'>
    Welcome to ShopEasy
  </h1>
    <p className='leading-9'>
    Your one-stop shop for everything you need! Explore our wide range of products, exclusive deals,<br/> and seamless shopping experience.
    </p>
      <Link to='/products' className='text-center text-gray-100 p-2 px-8 w-fit bg-[#634bc1] rounded-md'>Start Shopping</Link>
  </div>
  <h1 className='text-[#634bc1] text-3xl font-bold'>
    Why to Choose ShopEasy?
  </h1>
  <UploadedProducts/>
  <Footer/>
      
    </div>
  )
}

export default Products
