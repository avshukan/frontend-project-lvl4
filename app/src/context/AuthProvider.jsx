import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import AuthContext from './AuthContext';
import { addMessage, fetchData } from '../slices/dataSlice';

const KEY = 'token';

const socket = io({ autoConnect: false });

const hasToken = () => {
  const token = localStorage.getItem(KEY);
  const result = !!token;
  return result;
};

const getToken = () => {
  try {
    const keyStorage = localStorage.getItem(KEY);
    const token = JSON.parse(keyStorage)[KEY];
    return token;
  } catch (error) {
    return null;
  }
};

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);

  const initFetchData = useCallback(() => {
    const token = getToken();
    dispatch(fetchData(token));
  }, [dispatch]);

  const logIn = (token) => {
    localStorage.setItem(KEY, JSON.stringify({ token }));
    setIsLogged(true);
    initFetchData();
    socket.connect();
  };

  const logOut = () => {
    localStorage.removeItem(KEY);
    setIsLogged(false);
    socket.disconnect();
  };

  useEffect(() => {
    const isToken = hasToken();
    setIsLogged(isToken);
    if (isToken) {
      socket.connect();
      initFetchData();
    }
    socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
  }, [dispatch, initFetchData]);

  const value = useMemo(() => ({
    socket, hasToken, getToken, isLogged, logIn, logOut,
  }));

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
