import React from 'react'
import logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'

const Header :React.FC= () => {
  return (
    <nav className='bg-[#634bc1] w-full grid pr-3 pl-1 py-1 text-gray-100 text-center top-0   text-[18px] font-bold sticky'>
    <div className='grid grid-cols-2'>
    <div className='flex flex-row gap-2'>
      <Link to ='/'>
      <img src={logo} alt='logo' className='h-[45px] rounded-full'/>
      </Link>
      <h1 className='mt-2'>ShopEasy</h1>
    </div>
    <ul className='flex flex-row gap-9 justify-self-end mt-2 text-[20px]'>
      <li><Link to='/products'>Products</Link></li>
      <li><Link to='/products'>Login</Link></li>
      <li><Link to='/products'>Sign Up</Link></li>
      {/* <li><GoogleTranslate /></li> */}
    </ul>
    </div>
  </nav>
  )
}

export default Header
