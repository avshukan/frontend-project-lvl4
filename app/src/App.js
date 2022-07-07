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

const App = () => {

  const [text, setText] = useState('Hello, World!');

  const getToken = async () => {
    const response = await axios.post('/api/v1/login', { username: 'admin', password: 'admin' });
    const { data } = response;
    const { token } = data;
    setText(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <ul>
            <li>
              <Link to="/">Home</Link>
              </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/about" element={<div>About text</div>} />
          <Route path="/topics" element={<div>Topics text</div>} />
          <Route path="/" element={<div>{text}</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
