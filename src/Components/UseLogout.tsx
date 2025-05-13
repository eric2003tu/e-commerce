import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const UseLogout = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    // Clear user data from storage
    localStorage.removeItem('user');
    localStorage.removeItem('authToken'); // Optional: Remove token if used
    
    // Redirect to login and prevent going back
    navigate('/login', { replace: true });
  }, [navigate]);

  return handleLogout;
};