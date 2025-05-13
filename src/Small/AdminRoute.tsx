import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from './GetCookies';
import { jwtDecode } from 'jwt-decode';

interface AdminRouteProps {
  children: React.ReactElement;
}

export default function AdminRoute({ children }: AdminRouteProps): React.ReactElement {
  const token = getCookie('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<{ role?: string }>(token);

    if (decoded.role === 'admin') {
      return children;
    } else {
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    console.error('Token decoding failed:', err);
    return <Navigate to="/login" replace />;
  }
}