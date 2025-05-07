import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';

const Footer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <footer className="w-full bg-[#433d61] text-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

        {/* Search */}

        {/* Shop */}
        <div>
          <h3 className="text-sm sm:text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {['All Products', 'Electronics', 'Clothing', 'Accessories', 'Home & Living'].map(item => (
              <li key={item} className="cursor-pointer hover:text-[#ffdc89] hover:underline">
                {item}
              </li>
            ))}
          </ul>
          <div className="w-full">
          <h1 className="text-gray-100 text-sm sm:text-md text-start mt-2 mb-2">Find your desired product</h1>
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              placeholder="Find products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-l text-gray-100 focus:outline-none border border-white"
            />
            <button
              type="submit"
              className="bg-[#ffdc89] text-[#634bc1] px-3 py-2 rounded-r hover:bg-[#e6c97d] transition"
            >
              <IoMdSearch size={20} />
            </button>
          </form>
        </div>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-sm sm:text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {['Contact Us', 'Shipping & Returns', 'FAQs', 'Privacy Policy', 'Terms & Conditions'].map(item => (
              <li key={item} className="cursor-pointer hover:text-[#ffdc89] hover:underline">
                {item}
              </li>
            ))}
          </ul>
          
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm sm:text-lg font-semibold mb-3">Stay Connected</h3>
          <p className="mb-4 text-sm sm:text-base">Subscribe for updates and exclusive offers.</p>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 rounded text-gray-100 mb-2 focus:outline-none border border-white"
          />
          <button className="w-full bg-[#ffdc89] text-[#634bc1] px-3 py-2 rounded font-medium hover:bg-[#e6c97d] transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#ffdc89] text-center text-xs sm:text-sm">
        <p>© 2025 ShopEasy. All rights reserved.</p>
        <div className="flex justify-center gap-3 sm:gap-4 mt-2 flex-wrap">
          {['Privacy', 'Terms', 'Sitemap'].map(item => (
            <span key={item} className="cursor-pointer text-[#ffdc89] hover:underline">
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;