import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button, Container, Navbar, Row, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Error404Page from './components/Error404Page';
import queryString from './routes/queryString';
import SignupPage from './components/SignupPage';
import LanguageButton from './components/LanguageButton';

function App() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <Container fluid="md">
        <ToastContainer />
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
              <LanguageButton />
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
  );
}

export default App;
