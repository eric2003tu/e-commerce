// components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from './GetCookies';
import { jwtDecode } from 'jwt-decode';

export default function AdminRoute({ children }) {
  const token = getCookie('token');
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    return decoded.role === 'admin' ? children : <Navigate to="/unauthorized" />;
  } catch (err) {
    console.error('Token decoding failed:', err);
    return <Navigate to="/login" />;
  }
}
