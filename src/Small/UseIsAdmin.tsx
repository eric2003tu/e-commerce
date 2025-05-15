// hooks/useIsAdmin.js
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { getCookie } from './GetCookies';

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === 'admin');
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }, []);

  return isAdmin;
}
