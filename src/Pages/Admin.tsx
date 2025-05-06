import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './Dashboard'
import AddProduct from './AddProduct'

const Admin :React.FC = () => {
  return (
<Routes>
    <Route index element = {<Dashboard />}/>
    <Route path = 'add-product' element = {<AddProduct />}/>
</Routes>
  )
}

export default Admin
