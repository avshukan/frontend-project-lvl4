import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../context/useAuth';
import queryString from '../routes/queryString';

function LoginButton() {
  const { t } = useTranslation();
  const { isLogged } = useAuth();
  const location = useLocation();

  if (isLogged()) {
    return null;
  }
  return <Button as={Link} to={queryString.loginPath()} state={{ from: location }}>{t('navBar.loginButton')}</Button>;
}

export default LoginButton;
