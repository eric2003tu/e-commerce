import { useState, useEffect } from 'react';
import { getCookie } from './GetCookies';
import { jwtDecode } from 'jwt-decode';

export function useIsAdmin(): {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
} {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getCookie('token');
    
    if (!token) {
      setError('No token found');
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<{ role?: string }>(token);
      setIsAdmin(decoded.role === 'admin');
    } catch (err) {
      setError('Invalid token');
      console.error('Token decoding failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isAdmin, isLoading, error };
}