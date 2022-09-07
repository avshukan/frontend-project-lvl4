import React, { useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthProvider from './context/AuthProvider';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Error404Page from './components/Error404Page';
import queryString from './routes/queryString';
import { Button, Container, Navbar, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { io } from "socket.io-client";
import { addMessage, fetchData } from './slices/dataSlice';
import useAuth from './context/useAuth';

const socket = io({autoConnect: false});

const App = () => {
  return (
    <AuthProvider socket={socket}>
      <AppInsider />
    </AuthProvider>
  )
};

const AppInsider = () => {
  const dispatch = useDispatch();

  const auth = useAuth();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      if (!auth.logged()) {
        return;
      }
      dispatch(addMessage(payload));
    });
  }, []);

  const initFetchData = useCallback(() => {
    if (!auth.logged()) {
      return;
    }
    const token = auth.getToken();
    dispatch(fetchData(token));
  }, []);

  useEffect(() => initFetchData(), []);

  return (
    <Router>
      <Container fluid='md'>
        <Navbar bg='light' expand='lg'>
          <Container>
            <Navbar.Brand href={queryString.chatPath()}>_Speaky_</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <LinkContainer to={queryString.chatPath()}>
                <Button>Chat</Button>
              </LinkContainer>
              <LinkContainer to='/about'>
                <Button>About</Button>
              </LinkContainer>
              <LinkContainer to='/topics'>
                <Button>Topics</Button>
              </LinkContainer>
              <LoginButton />
              <LogoutButton />
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Row>
          <Col>
            <Routes>
              <Route path={queryString.loginPath()} element={<LoginPage />} />
              <Route path="/about" element={
                <PrivateRoute><div>About text</div></PrivateRoute>
              } />
              <Route path="/topics" element={
                <PrivateRoute><div>Topics text</div></PrivateRoute>
              } />
              <Route path={queryString.chatPath()} element={
                <PrivateRoute><MainPage /></PrivateRoute>
              } />
              <Route path={queryString.errorPath()} element={
                <PrivateRoute><Error404Page /></PrivateRoute>
              } />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
