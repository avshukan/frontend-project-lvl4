import React from 'react';
import { Button } from 'react-bootstrap';
import useAuth from '../context/useAuth';

function LogoutButton() {
  const { isLogged, logOut } = useAuth();

  if (!isLogged()) {
    return null;
  }
  return <Button onClick={logOut}>Log out</Button>;
}

export default LogoutButton;
