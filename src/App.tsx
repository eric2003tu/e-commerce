import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Payment from './Components/Payment';
import Login from './Components/Login';
import Signup from './Components/Signup'
import Admin from './Pages/Admin';
// import GoogleTranslate from "./Components/GoogleTranslate";

const App:React.FC = () => {
  return (
    <Router>
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
