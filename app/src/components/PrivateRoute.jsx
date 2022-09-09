import React, { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../context/useAuth';
import queryString from '../routes/queryString';

function PrivateRoute({ children }) {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (isLogged()) {
    return children;
  }
  return <Navigate to={queryString.loginPath()} state={{ from: location }} />;
}

export default PrivateRoute;
