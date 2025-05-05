import React from 'react'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Payment from './Components/Payment';
import Login from './Components/Login';
import Signup from './Components/Signup'
import Admin from './Pages/Admin';
import logo from './assets/logo.jpg'

const App:React.FC = () => {
  return (
    <Router>
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
        </ul>
        </div>
      </nav>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = '/products' element = {<Products />}/>
        <Route path = '/cart' element = {<Cart />}/>
        <Route path = '/checkout' element = {<Checkout />}/>
        <Route path = '/payment' element = {<Payment />}/>
        <Route path = '/login' element = {<Login />}/>
        <Route path = '/signup' element = {<Signup />}/>
        <Route path= '/admin/*' element = {<Admin />}/>
      </Routes>
    </Router>
  )
}

export default App;
