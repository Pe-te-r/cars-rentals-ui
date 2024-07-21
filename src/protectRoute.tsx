// ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isAuthenticated, isAdmin, ...rest }: any) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isAdmin !== undefined && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
