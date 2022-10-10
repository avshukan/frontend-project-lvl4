import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import queryString from '../routes/queryString';
import LogInOutButton from './LogInOutButton';
import LanguageButton from './LanguageButton';

function Header() {
  const { t } = useTranslation();

  return (
    <Navbar bg="light" expand="lg" className='m-0 p-4'>
      <Container className='d-flex'>
        <Navbar.Brand href={queryString.chatPath()}>{t('navBar.brand')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <LinkContainer to={queryString.chatPath()}>
            <Button>{t('navBar.chat')}</Button>
          </LinkContainer>
          <LinkContainer to="/about">
            <Button>{t('navBar.about')}</Button>
          </LinkContainer>
          <LinkContainer to="/topics">
            <Button>{t('navBar.topics')}</Button>
          </LinkContainer>
          <LanguageButton />
          <LogInOutButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
