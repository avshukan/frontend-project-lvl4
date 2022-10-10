import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../context/useAuth';
import queryString from '../routes/queryString';

function LogInOutButton() {
  const { t } = useTranslation();

  const { isLogged, logOut } = useAuth();

  const location = useLocation();

  return isLogged()
    ? <Button onClick={logOut} style={{ marginLeft: 'auto' }}>{t('navBar.logoutButton')}</Button>
    : <Button as={Link} to={queryString.loginPath()} state={{ from: location }} style={{ marginLeft: 'auto' }}>{t('navBar.loginButton')}</Button>;
}

export default LogInOutButton;
