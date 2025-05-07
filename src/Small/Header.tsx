import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { MdLogin, MdAppRegistration } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";

const Header: React.FC = () => {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <nav className='bg-[#634bc1] w-full px-4 text-gray-100 backdrop-blur-sm sticky top-0 h-fit font-bold text-[18px] z-50'>
      <div className='flex items-center justify-between'>
        {/* Logo and Title */}
        <div className='flex items-center gap-2'>
          <Link to='/'>
            <img src={logo} alt='logo' className='h-[45px] rounded-full' />
          </Link>
          <h1 className='text-white'>ShopEasy</h1>
        </div>

        {/* Burger Menu */}
        <div className='md:hidden lg:hidden'>
          <CiMenuBurger size={30} onClick={() => setMenu(!menu)} className='cursor-pointer' />
        </div>

        {/* Desktop Menu */}
        <ul className='hidden md:flex lg:flex flex-row gap-9 text-[20px] items-center'>
          <li className='flex items-center gap-1'>
            <FaBoxOpen size={22} />
            <Link to='/products'>Products</Link>
          </li>
          <li className='flex items-center gap-1'>
            <BsCart2 size={22} />
            <Link to='/login'>Cart</Link>
          </li>
          <li className='flex items-center gap-1'>
            <MdLogin size={22} />
            <Link to='/login'>Login</Link>
          </li>
          <li className='flex items-center gap-1'>
            <MdAppRegistration size={22} />
            <Link to='/signup'>Sign Up</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <ul className='absolute flex flex-col top-11 bg-[#9984ef] w-fit right-0 text-[18px] md:hidden lg:hidden rounded-b transition-all duration-500 ease-in-out z-40'>
          <li className='hover:bg-[#cac4e4] p-2 px-4 flex items-center gap-2'>
            <FaBoxOpen size={20} />
            <Link to='/products'>Products</Link>
          </li>
          <li className='hover:bg-[#cec5f0] p-2 px-4 flex items-center gap-2'>
            <BsCart2 size={20} />
            <Link to='/cart'>Cart</Link>
          </li>
          <li className='hover:bg-[#634bc1] p-2 px-4 flex items-center gap-2'>
            <MdLogin size={20} />
            <Link to='/login'>Login</Link>
          </li>
          <li className='hover:bg-[#634bc1] p-2 px-4 flex items-center gap-2'>
            <MdAppRegistration size={20} />
            <Link to='/signup'>Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
