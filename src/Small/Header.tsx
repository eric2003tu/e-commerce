import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { BsCart2, BsPerson, BsBoxSeam } from "react-icons/bs";
import { MdLogin, MdAppRegistration, MdAdminPanelSettings } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#634bc1] shadow-lg' : 'bg-[#634bc1]/90 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between ">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="ShopEasy Logo" 
                className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-white/30 group-hover:border-[#ffdc89] transition-all"
              />
              <span className="text-white font-bold text-xl md:text-2xl ml-2">
                Shop<span className="text-[#ffdc89]">Easy</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <Link 
              to="/products" 
              className="px-3 py-2 rounded-md text-sm lg:text-base font-medium text-white hover:bg-white/10 flex items-center gap-2 transition-colors"
            >
              <BsBoxSeam className="text-lg" />
              Products
            </Link>
            <Link 
              to="/cart" 
              className="px-3 py-2 rounded-md text-sm lg:text-base font-medium text-white hover:bg-white/10 flex items-center gap-2 transition-colors"
            >
              <BsCart2 className="text-lg" />
              Cart
            </Link>
            <Link 
              to="/login" 
              className="px-3 py-2 rounded-md text-sm lg:text-base font-medium text-white hover:bg-white/10 flex items-center gap-2 transition-colors"
            >
              <MdLogin className="text-lg" />
              Login
            </Link>
            <Link 
              to="/admin" 
              className="px-3 py-2 rounded-md text-sm lg:text-base font-medium text-white hover:bg-white/10 flex items-center gap-2 transition-colors"
            >
              <MdAdminPanelSettings className="text-lg" />
              Admin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <CiMenuBurger className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#634bc1] shadow-xl rounded-b-lg">
          <Link
            to="/products"
            className="flex items-center gap-3 text-white hover:bg-white/10 block px-3 py-3 rounded-md text-base font-medium transition-colors"
          >
            <BsBoxSeam />
            Products
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-3 text-white hover:bg-white/10 block px-3 py-3 rounded-md text-base font-medium transition-colors"
          >
            <BsCart2 />
            Cart
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-3 text-white hover:bg-white/10 block px-3 py-3 rounded-md text-base font-medium transition-colors"
          >
            <MdLogin />
            Login
          </Link>
          <Link
            to="/admin"
            className="flex items-center gap-3 text-white hover:bg-white/10 block px-3 py-3 rounded-md text-base font-medium transition-colors"
          >
            <MdAdminPanelSettings />
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;