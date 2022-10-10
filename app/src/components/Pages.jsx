import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import Error404Page from './Error404Page';
import queryString from '../routes/queryString';
import SignupPage from './SignupPage';

function Pages() {
  const { t } = useTranslation();

  return (
    <Container className='flex-grow-1 p-0'>
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
            <PrivateRoute><ChatPage /></PrivateRoute>
          }
        />
        <Route
          path={queryString.errorPath()}
          element={
            <PrivateRoute><Error404Page /></PrivateRoute>
          }
        />
      </Routes>
    </Container>
  );
}

export default Pages;
