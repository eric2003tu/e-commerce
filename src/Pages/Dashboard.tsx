import React, { useState, useEffect } from 'react';
import { FiUsers, FiShoppingBag, FiBarChart2, FiSettings, FiMenu } from 'react-icons/fi';
import { HiOutlineLogout, HiOutlineSearch } from 'react-icons/hi';
import Users from './Users';
import Products from './AdminProducts';
import Settings from './Settings';
import { Link } from 'react-router-dom';
import Footer from '../Small/Footer';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState([
    { title: 'Total Products', value: 0, icon: <FiShoppingBag /> },
    { title: 'Active Users', value: 0, icon: <FiUsers /> },
    { title: 'Monthly Sales', value: '$0', icon: <FiBarChart2 /> },
  ]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch the statistics data
    const fetchStats = async () => {
      try {
        // Fetch users data
        const usersResponse = await fetch('https://e-commerce-back-xy6s.onrender.com/api/users');
        const usersData = await usersResponse.json();
        
        // Fetch products data
        const productsResponse = await fetch('https://e-commerce-back-xy6s.onrender.com/api/products');
        const productsData = await productsResponse.json();
        
        // Count active users (assuming active users are those with isActive: true)
        const activeUsersCount = usersData.filter(user => user.isActive).length;
        
        setStats([
          { title: 'Total Products', value: productsData.length, icon: <FiShoppingBag /> },
          { title: 'Active Users', value: activeUsersCount, icon: <FiUsers /> },
          { title: 'Monthly Sales', value: '$0', icon: <FiBarChart2 /> }, // Placeholder for sales data
        ]);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  const allProducts = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 45 },
    { id: 2, name: 'Cotton T-Shirt', category: 'Clothing', price: 24.99, stock: 120 },
    { id: 3, name: 'Smart Watch', category: 'Electronics', price: 199.99, stock: 32 },
    { id: 4, name: 'Ceramic Mug', category: 'Home', price: 14.99, stock: 85 },
  ];

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div>
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#433d61] text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Admin<span className="text-[#ffdc89]">Panel</span></h1>
          <p className="text-xs text-gray-300">StyleStore Management</p>
        </div>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-[#634bc1]/50"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-[#433d61] text-white p-4 flex flex-col z-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl font-bold">Admin<span className="text-[#ffdc89]">Panel</span></h1>
                <p className="text-xs text-gray-300">StyleStore Management</p>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md hover:bg-[#634bc1]/50"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col space-y-2 flex-1">
              {[
                { tab: 'dashboard', icon: <FiBarChart2 />, name: 'Dashboard' },
                { tab: 'products', icon: <FiShoppingBag />, name: 'Products' },
                { tab: 'users', icon: <FiUsers />, name: 'Users' },
                { tab: 'settings', icon: <FiSettings />, name: 'Settings' },
              ].map((item) => (
                <button
                  key={item.tab}
                  onClick={() => handleTabChange(item.tab)}
                  className={`flex items-center w-full p-3 rounded-lg text-left ${
                    activeTab === item.tab ? 'bg-[#634bc1]' : 'hover:bg-[#634bc1]/50'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </button>
              ))}
            </div>

            <Link 
              to="/" 
              className="flex items-center p-3 mt-4 hover:bg-[#634bc1]/50 rounded-lg text-sm"
            >
              <HiOutlineLogout className="mr-3" /> Logout
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#433d61] text-white p-4 flex-col">
        <div className="mb-6">
          <h1 className="text-xl font-bold">Admin<span className="text-[#ffdc89]">Panel</span></h1>
          <p className="text-xs text-gray-300">StyleStore Management</p>
        </div>

        <div className="flex flex-col space-y-2 flex-1">
          {[
            { tab: 'dashboard', icon: <FiBarChart2 />, name: 'Dashboard' },
            { tab: 'products', icon: <FiShoppingBag />, name: 'Products' },
            { tab: 'users', icon: <FiUsers />, name: 'Users' },
            { tab: 'settings', icon: <FiSettings />, name: 'Settings' },
          ].map((item) => (
            <button
              key={item.tab}
              onClick={() => handleTabChange(item.tab)}
              className={`flex items-center w-full p-3 rounded-lg text-left ${
                activeTab === item.tab ? 'bg-[#634bc1]' : 'hover:bg-[#634bc1]/50'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </button>
          ))}
        </div>

        <Link 
          to="/" 
          className="flex items-center p-3 mt-4 hover:bg-[#634bc1]/50 rounded-lg text-sm"
        >
          <HiOutlineLogout className="mr-3" /> Logout
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white p-2 shadow-sm sticky top-0 z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
            
            {  (
              <div className="relative w-full md:w-64">
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]"
                  placeholder={`Search ${activeTab}...`}
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                {stats.map((stat, i) => (
                  <div 
                    key={i} 
                    className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-[#433d61]">{stat.value}</h3>
                      </div>
                      <div className="p-2 bg-[#634bc1]/10 text-[#634bc1] rounded-lg">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-lg mb-4 text-[#433d61]">Recent Activity</h3>
                <div className="text-center py-8 text-gray-400">
                  Activity timeline will appear here
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <Products products={filteredProducts} />
          )}

          {activeTab === 'users' && (
            <Users />
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <Settings />
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default AdminDashboard;