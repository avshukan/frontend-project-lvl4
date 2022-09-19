import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import useAuth from '../context/useAuth';

function LogoutButton() {
  const { t } = useTranslation();

  const { isLogged, logOut } = useAuth();

  if (!isLogged()) {
    return null;
  }
  return <Button onClick={logOut}>{t('navBar.logoutButton')}</Button>;
}

export default LogoutButton;
