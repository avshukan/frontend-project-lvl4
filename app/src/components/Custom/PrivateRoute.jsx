import React, { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import queryString from '../../routes/queryString';

function PrivateRoute({ children }) {
  const { isLogged } = useAuth();

  const location = useLocation();

  return isLogged()
    ? children
    : <Navigate to={queryString.loginPath()} state={{ from: location }} />;
}

export default PrivateRoute;
