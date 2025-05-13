import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedUserProps {
  children: ReactNode;
}

const ProtectedUser: React.FC<ProtectedUserProps> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedUser;
