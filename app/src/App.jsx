import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Button, Container, Navbar, Row, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import AuthProvider from './context/AuthProvider';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Error404Page from './components/Error404Page';
import queryString from './routes/queryString';
import SignupPage from './components/SignupPage';
import locales from './locales';

i18n
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: 'ru', // if you're using a language detector, do not define the lng option
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

function App() {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Container fluid="md">
          <Navbar bg="light" expand="lg">
            <Container>
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
                <LoginButton />
                <LogoutButton />
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Row>
            <Col>
              <Routes>
                <Route path={queryString.signupPath()} element={<SignupPage />} />
                <Route path={queryString.loginPath()} element={<LoginPage />} />
                <Route
                  path="/about"
                  element={
                    <PrivateRoute><div>About text</div></PrivateRoute>
                  }
                />
                <Route
                  path="/topics"
                  element={
                    <PrivateRoute><div>Topics text</div></PrivateRoute>
                  }
                />
                <Route
                  path={queryString.chatPath()}
                  element={
                    <PrivateRoute><MainPage /></PrivateRoute>
                  }
                />
                <Route
                  path={queryString.errorPath()}
                  element={
                    <PrivateRoute><Error404Page /></PrivateRoute>
                  }
                />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
