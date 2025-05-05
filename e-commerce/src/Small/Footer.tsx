import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#634bc1] p-6 text-center">
      <p className="text-white text-sm md:text-base">
        © 2024 ShopEasy. All rights reserved. |{' '}
        <span className="text-[#ffdc89] cursor-pointer hover:underline">Privacy Policy</span> |{' '}
        <span className="text-[#ffdc89] cursor-pointer hover:underline">Terms of Service</span>
      </p>
    </footer>
  );
};

export default Footer;

