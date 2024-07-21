// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useDetails } from './context/LocalStorageContext';

const ProtectedRoute = ({ element: Component,role, ...rest }: any) => {
  const {user} = useDetails()

  if(!user){
    return <Navigate to="/" />;
  }
  let to;
  if(user.role === 'admin'){
    to = '/admin'
  }else{
    to = '/dashboard'
  }

  if(user?.role === role){
    return <Component {...rest} />
  }else{
    return <Navigate to={to} />;
  }

};

export default ProtectedRoute;
