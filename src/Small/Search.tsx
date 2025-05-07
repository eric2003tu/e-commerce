import React, { useState } from 'react'
import { IoMdSearch } from 'react-icons/io';

const Search :React.FC= () => {
      const [searchQuery, setSearchQuery] = useState('');
    
      const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
      };
  return (
        <div className='w-full'>
          <h1 className="text-[#634bc1] text-md text-start mt-2">Find your desired product</h1>
          <form onSubmit={handleSearch} className="flex flex-row w-full">
            <input
              type="text"
              placeholder="Find products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-l text-gray-700 focus:outline-none border border-gray-600"
            />
            <button
              type="submit"
              className="bg-[#ffdc89] text-[#634bc1] px-4 py-2 rounded-r hover:bg-[#e6c97d] transition"
            >
              <IoMdSearch size={20} />
            </button>
          </form>
        </div>
  )
}

export default Search
