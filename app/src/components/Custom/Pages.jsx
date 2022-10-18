import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import queryString from '../../routes/queryString';
import PrivateRoute from './PrivateRoute';
import NonPrivateRoute from './NonPrivateRoute';
import LoginPage from '../LoginPage/LoginPage';
import ChatPage from '../ChatPage/ChatPage';
import Error404Page from '../Error404Page/Error404Page';
import AboutPage from '../AboutPage/AboutPage';
import SignupPage from '../SignupPage/SignupPage';

function Pages() {
  return (
    <Container className="flex-grow-1 p-0">
      <Routes>
        <Route
          path={queryString.signupPath()}
          element={<NonPrivateRoute><SignupPage /></NonPrivateRoute>}
        />
        <Route
          path={queryString.loginPath()}
          element={<NonPrivateRoute><LoginPage /></NonPrivateRoute>}
        />
        <Route
          path={queryString.aboutPath()}
          element={<PrivateRoute><AboutPage /></PrivateRoute>}
        />
        <Route
          path={queryString.chatPath()}
          element={<PrivateRoute><ChatPage /></PrivateRoute>}
        />
        <Route
          path={queryString.errorPath()}
          element={<PrivateRoute><Error404Page /></PrivateRoute>}
        />
      </Routes>
    </Container>
  );
}

export default Pages;