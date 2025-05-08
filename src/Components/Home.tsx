import React from 'react'
import { Link } from 'react-router-dom'
import shoes from '../assets/shoes.jpg'
import bag from '../assets/bag.jpg'
import watch from '../assets/watch.jpg'
import electronics from '../assets/electronics.png'
import fashion from '../assets/fashion.png'
import home from '../assets/Easy.png'
import Footer from '../Small/Footer'
import Header from '../Small/Header'
import Search from '../Small/Search'
import { FiTruck, FiShield, FiShoppingBag, FiClock, FiTag, FiHeadphones } from 'react-icons/fi'
import { FaStar, FaRegHeart, FaRegUser, FaRegCreditCard } from 'react-icons/fa'
import { BsBoxSeam } from 'react-icons/bs'

const Home: React.FC = () => {
  const features = [
    {
      icon: <FiShoppingBag className="text-3xl" />,
      title: "Wide Product Range",
      description: "Explore thousands of high-quality products across multiple categories at competitive prices"
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: "Secure Payments",
      description: "Shop with confidence using our safe payment options. Your security is our top priority"
    },
    {
      icon: <FiTruck className="text-3xl" />,
      title: "Fast Delivery",
      description: "Get orders delivered quickly with real-time tracking and hassle-free returns"
    }
  ]

  const products = [
    {
      image: shoes,
      name: "Premium Running Shoes",
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.8,
      reviews: 1245,
      isNew: true
    },
    {
      image: bag,
      name: "Designer Handbag",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.5,
      reviews: 892,
      isNew: false
    },
    {
      image: watch,
      name: "Smart Watch Pro",
      price: 249.99,
      originalPrice: 299.99,
      rating: 4.9,
      reviews: 2103,
      isNew: true
    }
  ]

  const categories = [
    {
      image: electronics,
      name: "Electronics",
      count: 1250
    },
    {
      image: fashion,
      name: "Fashion",
      count: 3420
    },
    {
      image: home,
      name: "Home & Living",
      count: 876
    }
  ]

  const testimonials = [
    {
      quote: "ShopEasy has completely transformed my shopping experience. The delivery is always on time and the quality is exceptional!",
      author: "Sarah Johnson",
      role: "Loyal Customer"
    },
    {
      quote: "As a busy professional, I appreciate how easy it is to find exactly what I need. Their customer service is outstanding.",
      author: "Michael Chen",
      role: "Verified Buyer"
    },
    {
      quote: "The prices are unbeatable and the selection is vast. I've recommended ShopEasy to all my friends and family.",
      author: "Emily Rodriguez",
      role: "Premium Member"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#332e47] to-[#1d163c] py-16 pt-20 px-4 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Welcome to <span className="text-[#ffdc89]">ShopEasy</span>
            </h1>
            <p className="text-lg md:text-xl">
              Your one-stop shop for the best deals, latest trends, and all your favorite products. 
              From fashion to electronics, we've got you covered with over 50,000 quality items!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-3 bg-[#ffdc89] text-[#634bc1] font-semibold rounded-lg hover:bg-[#ffe8a8] transition-colors shadow-lg"
              >
                Sign Up Now
              </Link>
              <Link 
                to="/products" 
                className="px-8 py-3 border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-[#634bc1] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <FiClock className="text-[#ffdc89]" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <BsBoxSeam className="text-[#ffdc89]" />
                <span>Free Shipping Over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegCreditCard className="text-[#ffdc89]" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Search />
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#ffdc89] opacity-10"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#634bc1] opacity-10"></div>
      </section>

      {/* Mobile Search */}
      <div className="md:hidden p-4 bg-white shadow-md">
        <Search />
      </div>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Why Choose ShopEasy?
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We're committed to providing an exceptional shopping experience with benefits that set us apart
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="text-[#634bc1] mb-4 p-4 bg-[#f5f2ff] rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Browse through our extensive collection of products in popular categories
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-gray-200">{category.count} products</p>
                  <Link 
                    to={`/products?category=${category.name.toLowerCase()}`} 
                    className="mt-3 inline-flex items-center text-white font-medium hover:text-[#ffdc89] transition-colors"
                  >
                    Shop Now
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Featured Products
              </h2>
              <p className="text-gray-600 mt-2">Handpicked items from our collection</p>
            </div>
            <Link 
              to="/products" 
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              View All Products
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-[#ffdc89] text-[#634bc1] px-3 py-1 rounded-full text-sm font-semibold">
                      New Arrival
                    </div>
                  )}
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <FaRegHeart className="text-gray-700 hover:text-red-500" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                    <span className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
                      <FaStar className="text-yellow-500 mr-1" />
                      {product.rating} <span className="text-gray-500 ml-1">({product.reviews})</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-2xl font-bold text-[#634bc1]">${product.price}</p>
                    {product.originalPrice && (
                      <p className="text-gray-400 line-through">${product.originalPrice}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                      to="/products" 
                      className="py-2 text-center bg-[#634bc1] text-white rounded-lg hover:bg-[#756a9f] transition-colors"
                    >
                      View Details
                    </Link>
                    <button className="py-2 text-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#634bc1] to-[#3a2b7c] text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-[#ffdc89] text-[#634bc1] px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Limited Time Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Summer Sale - Up to 50% Off
            </h2>
            <p className="text-lg mb-6">
              Don't miss our biggest sale of the season! Shop now and save on thousands of items across all categories.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold bg-white/20 rounded-lg px-4 py-2 w-16">03</div>
                <span className="text-sm mt-1 block">Days</span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-white/20 rounded-lg px-4 py-2 w-16">12</div>
                <span className="text-sm mt-1 block">Hours</span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-white/20 rounded-lg px-4 py-2 w-16">45</div>
                <span className="text-sm mt-1 block">Minutes</span>
              </div>
            </div>
            <Link 
              to="/sale" 
              className="inline-block px-8 py-3 bg-[#ffdc89] text-[#634bc1] font-semibold rounded-lg hover:bg-[#ffe8a8] transition-colors shadow-lg"
            >
              Shop the Sale
            </Link>
          </div>
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={fashion} 
                alt="Summer Sale" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white text-[#634bc1] px-6 py-3 rounded-lg shadow-lg font-bold text-xl">
              50% OFF
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Trusted by thousands of happy shoppers worldwide
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5" />
                  ))}
                </div>
                <blockquote className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <FaRegUser className="text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            How ShopEasy Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Simple steps to get what you need, when you need it
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f5f2ff] rounded-full flex items-center justify-center mx-auto mb-4 text-[#634bc1]">
                <FiShoppingBag className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">1. Browse Products</h3>
              <p className="text-gray-600 text-sm">Explore our wide selection of products</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f5f2ff] rounded-full flex items-center justify-center mx-auto mb-4 text-[#634bc1]">
                <FiTag className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">2. Add to Cart</h3>
              <p className="text-gray-600 text-sm">Select items and add them to your cart</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f5f2ff] rounded-full flex items-center justify-center mx-auto mb-4 text-[#634bc1]">
                <FaRegCreditCard className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">3. Secure Checkout</h3>
              <p className="text-gray-600 text-sm">Complete your purchase safely</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f5f2ff] rounded-full flex items-center justify-center mx-auto mb-4 text-[#634bc1]">
                <FiTruck className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">4. Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Receive your order quickly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-[#634bc1] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Stay Connected
          </div>
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8 max-w-2xl mx-auto text-lg">
            Subscribe to get exclusive deals, new arrivals, and special offers delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffdc89]"
            />
            <button className="px-8 py-4 bg-[#ffdc89] text-[#634bc1] font-semibold rounded-lg hover:bg-[#ffe8a8] transition-colors shadow-md">
              Subscribe Now
            </button>
          </div>
          <p className="mt-4 text-sm text-white/80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Customer Support */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-14 h-14 bg-[#f5f2ff] rounded-full flex items-center justify-center mx-auto mb-4 text-[#634bc1]">
              <FiHeadphones className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Customer Support</h3>
            <p className="text-gray-600 mb-4">We're always here to help you with any questions or concerns</p>
            <Link to="/contact" className="text-[#634bc1] font-medium hover:underline">
              Contact Us
            </Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-14 h-14 bg-[#f5f2ff] rounded-full flex items-center justify-center mx-auto mb-4 text-[#634bc1]">
              <FiTruck className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Track Your Order</h3>
            <p className="text-gray-600 mb-4">Follow your purchase from warehouse to your doorstep</p>
            <Link to="/track-order" className="text-[#634bc1] font-medium hover:underline">
              Track Now
            </Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-14 h-14 bg-[#f5f2ff] rounded-full flex items-center justify-center mx-auto mb-4 text-[#634bc1]">
              <FiShield className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Return Policy</h3>
            <p className="text-gray-600 mb-4">30-day hassle-free returns on most items</p>
            <Link to="/returns" className="text-[#634bc1] font-medium hover:underline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home