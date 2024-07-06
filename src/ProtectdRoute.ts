import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store'; // Adjust the import based on your store setup

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  return auth.isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
