import React from 'react'
import { Link } from 'react-router-dom'
import shoes from '../assets/shoes.jpg'
import bag from '../assets/bag.jpg'
import watch from '../assets/watch.jpg'
import Footer from '../Small/Footer'
import Header from '../Small/Header'


const Home:React.FC = () => {
  return (
<div className=' grid grid-cols-1 justify-items-center gap-9 w-full text-center '>
  <Header/>
  <div className='grid grid-cols-1 gap-6 bg-white px-8 w-3/5 rounded-lg shadow-md  pt-7 pb-4'>
  <h1 className='text-[#634bc1] text-3xl font-bold'>
    Welcome to ShopEasy
  </h1>
    <p className='leading-9'>
    Your one-stop shop for the best deals, latest trends, and all your favorite products. From fashion to electronics, we've got you covered!

<strong className='text-gray-600'> Join us today </strong>and enjoy an exclusive shopping experience tailored to your needs.
    </p>
    <div className='justify-items-center grid grid-cols-2'>
      <Link to ='/signup' className='text-center text-gray-100 p-2 px-8  bg-[#634bc1] rounded-md'>Sign Up Now</Link>
      <Link to='/products' className='text-center text-gray-100 p-2 px-8  bg-[#634bc1] rounded-md'>Start Shopping</Link>
    </div>
  </div>
  <h1 className='text-[#634bc1] text-3xl font-bold'>
    Why to Choose ShopEasy?
  </h1>
  <div className='bg-white w-4/5 grid grid-cols-1 gap-3 tex shadow-md rounded-lg just p-5 px-7 text-start'>
  <h1 className='text-[#634bc1] text-xl font-bold '>
  Wide Product Range
  </h1>
  <p >
    Explore an extensive collection of high-quality products across multiple categories,<br/>all at competitive prices
  </p>
  </div>
  <div className='bg-white w-4/5 grid grid-cols-1 gap-3 tex shadow-md rounded-lg just p-5 px-7 text-start'>
  <h1 className='text-[#634bc1] text-xl font-bold '>
  Secure Payments
  </h1>
  <p >
  Shop with confidence using our safe and secure payment options. Your privacy and security <br/>are our top priority.
  </p>
  </div>
  <div className='bg-white w-4/5 grid grid-cols-1 gap-3 tex shadow-md rounded-lg just p-5 px-7 text-start'>
  <h1 className='text-[#634bc1] text-xl font-bold '>
  Fast Delivery
  </h1>
  <p >
  Get your orders delivered quickly and reliably, right to your doorstep. Enjoy hassle-free shopping at its best.
  </p>
  </div>
  <h1 className='text-[#634bc1] text-3xl font-bold'>
  Featured Products
  </h1>
  <div className='grid grid-cols-3 gap-4 w-5/6 '>
  <div className='grid grid-cols-1 bg-white justify-items-center rounded-lg shadow-md p-4'>
    <img src={shoes} alt="shoes" className='object-contain rounded-md' />
    <h1 className='text-[#634bc1] text-xl font-bold '>
  Shoes
  </h1>
  <p>34$</p>
  <Link to ='/signup' className='text-center text-gray-100 p-2 px-4 w-1/2  bg-[#634bc1] rounded-md'>Buy Now</Link>
  </div>
  <div className='grid grid-cols-1 bg-white justify-items-center rounded-lg shadow-md p-4'>
    <img src={bag} alt="bag" className='object-contain rounded-md' />
    <h1 className='text-[#634bc1] text-xl font-bold '>
  armbag
  </h1>
  <p>54$</p>
  <Link to ='/signup' className='text-center text-gray-100 p-2 px-4 w-1/2  bg-[#634bc1] rounded-md'>Buy Now</Link>
  </div>
  <div className='grid grid-cols-1 bg-white justify-items-center rounded-lg shadow-md p-4'>
    <img src={watch} alt="watch" className='object-contain rounded-md' />
    <h1 className='text-[#634bc1] text-xl font-bold '>
  Smart watch
  </h1>
  <p>134$</p>
  <Link to ='/signup' className='text-center text-gray-100 p-2 px-4 w-1/2  bg-[#634bc1] rounded-md'>Buy Now</Link>
  </div>
  </div>
<Footer/>
</div>
  )
}

export default Home
