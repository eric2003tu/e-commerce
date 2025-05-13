import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddProduct from './AddProduct';
import AdminRoute from '../Small/AdminRoute';

const Admin: React.FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route
        path="add-product"
        element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default Admin;