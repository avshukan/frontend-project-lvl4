import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useAuth from '../context/useAuth';
import queryString from '../routes/queryString';

function LoginButton() {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (isLogged) {
    return null;
  }
  return <Button as={Link} to={queryString.loginPath()} state={{ from: location }}>Log in</Button>;
}

export default LoginButton;
