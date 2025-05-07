import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';

const Footer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <footer className="w-full bg-[#433d61] text-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Search */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Search</h3>
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
              className="bg-[#ffdc89] text-[#634bc1] px-4 py-2 rounded-r hover:bg-[#e6c97d] transition"
            >
              <IoMdSearch size={20} />
            </button>
          </form>
          <p className="text-[#ffdc89] text-sm italic mt-2">Find your perfect style</p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2">
            {['All Products', 'Electronics', 'Clothing', 'Accessories', 'Home & Living'].map(item => (
              <li key={item} className="cursor-pointer hover:text-[#ffdc89] hover:underline">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2">
            {['Contact Us', 'Shipping & Returns', 'FAQs', 'Privacy Policy', 'Terms & Conditions'].map(item => (
              <li key={item} className="cursor-pointer hover:text-[#ffdc89] hover:underline">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <p className="mb-4">Subscribe for updates and exclusive offers.</p>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-2 rounded text-gray-100 mb-2 focus:outline-none border border-white"
          />
          <button className="w-full bg-[#ffdc89] text-[#634bc1] px-4 py-2 rounded font-medium hover:bg-[#e6c97d] transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#ffdc89] text-center text-sm">
        <p>© 2025 StyleStore. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2 flex-wrap">
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
