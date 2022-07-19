import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import axios from 'axios';
import './App.css';
import AuthProvider from './context/AuthProvider';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Error404Page from './components/Error404Page';
import queryString from './routes/queryString';
import routes from './routes/routes';

const App = () => {

  const [text, setText] = useState('Hello, World!');

  const getToken = async () => {
    const response = await axios.post(routes.loginPath(), { username: 'admin', password: 'admin' });
    const { data } = response;
    const { token } = data;
    setText(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ul>
            <li>
              <Link to={queryString.chatPath()}>Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <LoginButton />
            <LogoutButton />
          </ul>
        </div>
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
      </Router>
    </AuthProvider>
  );
}

export default App;
