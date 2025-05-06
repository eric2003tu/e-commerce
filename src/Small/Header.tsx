import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";

const Header: React.FC = () => {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <nav className='bg-[#634bc1] w-full px-4 text-gray-100 sticky top-0 h-fit  font-bold text-[18px]'>
      <div className='flex items-center justify-between'>
        {/* Logo and Title */}
        <div className='flex items-center gap-2'>
          <Link to='/'>
            <img src={logo} alt='logo' className='h-[45px] rounded-full' />
          </Link>
          <h1 className='text-white'>ShopEasy</h1>
        </div>

        {/* Burger Menu (Visible on small screens) */}
        <div className='md:hidden lg:hidden'>
          <CiMenuBurger size={30} onClick={() => setMenu(!menu)} className='cursor-pointer' />
        </div>

        {/* Desktop Menu */}
        <ul className=' hidden md:flex lg:flex flex-row gap-9 text-[20px]'>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/cart'>Cart</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
        </ul>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menu && (
        <ul className={`absolute flex flex-col top-11  bg-[#9984ef] w-fit right-0 text-[18px] md:hidden lg:hidden rounded-b rounded-r-0  transition-all duration-500 ease-in-out tra ${menu ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <li className='hover:bg-[#cac4e4] p-2 px-4'><Link to='/products'>Products</Link></li>
          <li className='hover:bg-[#cec5f0] p-2 px-4'><Link to='/cart'>Cart</Link></li>
          <li className='hover:bg-[#634bc1] p-2 px-4'><Link to='/login'>Login</Link></li>
          <li className='hover:bg-[#634bc1] p-2 px-4'><Link to='/signup'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
