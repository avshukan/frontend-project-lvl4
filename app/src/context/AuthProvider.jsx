import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AuthContext from './AuthContext';
import {
  addChannel, addMessage, fetchData, removeChannel, renameChannel,
} from '../slices/dataSlice';

const socket = io({ autoConnect: false });

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [username, setUsername] = useState('');

  const isLogged = useCallback(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }, []);

  const uploadData = useCallback((token) => {
    const toastId = toast.loading(t('authProvider.toast.pending'));
    dispatch(fetchData(token))
      .unwrap()
      .then(() => {
        toast.update(toastId, {
          render: t('authProvider.toast.success'), type: 'success', isLoading: false, autoClose: 3000, delay: 1000,
        });
      })
      .catch(() => {
        toast.update(toastId, {
          render: t('authProvider.toast.error'), type: 'error', isLoading: false, autoClose: 3000, delay: 1000,
        });
      });
  }, [dispatch, t]);

  const logIn = useCallback((user, token) => {
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    setUsername(user);
    socket.connect();
    uploadData(token);
  }, [uploadData]);

  const logOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsername('');
    socket.disconnect();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) {
      uploadData(token);
      setUsername(user);
      socket.connect();
    }
    socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
    socket.on('renameChannel', (payload) => dispatch(renameChannel(payload)));
    socket.on('removeChannel', (payload) => dispatch(removeChannel(payload)));
    socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
  }, [dispatch, uploadData]);

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
