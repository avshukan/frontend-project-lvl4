import React, { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import queryString from '../../routes/queryString';

function NonPrivateRoute({ children }) {
  const { isLogged } = useAuth();

  const location = useLocation();

  return isLogged()
    ? <Navigate to={queryString.chatPath()} state={{ from: location }} />
    : children;
}

export default NonPrivateRoute;
