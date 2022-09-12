import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import AuthContext from './AuthContext';
import { addChannel, addMessage, fetchData } from '../slices/dataSlice';

const socket = io({ autoConnect: false });

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const initFetchData = useCallback((token) => dispatch(fetchData(token)), [dispatch]);

  const isLogged = useCallback(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }, []);

  const logIn = useCallback((user, token) => {
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    setUsername(user);
    socket.connect();
    dispatch(fetchData(token));
  }, [dispatch]);

  const logOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsername('');
    socket.disconnect();
  }, []);

  useEffect(() => {
    console.log('useEffect');
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log('token', token);
    console.log('user', user);
    if (token) {
      dispatch(fetchData(token));
      setUsername(user);
      socket.connect();
    }
    socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
    socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
  }, [dispatch, initFetchData]);

  const value = useMemo(() => ({
    socket, isLogged, logIn, logOut, username,
  }), [isLogged, logIn, logOut, username]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
