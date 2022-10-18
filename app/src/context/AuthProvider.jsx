import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useRollbar } from '@rollbar/react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import fetchDataThunk from '../slices/fetchDataThunk';
import { addChannel, removeChannel, renameChannel } from '../slices/channelsSlice';
import { addMessage, removeMessagesByChannelId } from '../slices/messagesSlice';

const socket = io({ autoConnect: false });

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const rollbar = useRollbar();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [user, setUser] = useState({});

  const isLogged = useCallback(() => {
    const { username, token } = user;
    return !!username && !!token;
  }, [user]);

  const uploadData = useCallback((token) => {
    const toastId = toast.loading(t('authProvider.toast.pending'));
    dispatch(fetchDataThunk(token))
      .unwrap()
      .then(() => {
        toast.update(toastId, {
          render: t('authProvider.toast.success'), type: 'success', isLoading: false, autoClose: 1000,
        });
      })
      .catch((error) => {
        rollbar.error('Error fetching data', error, { token });
        toast.update(toastId, {
          render: t('authProvider.toast.error'), type: 'error', isLoading: false, autoClose: 3000,
        });
      });
  }, [dispatch, rollbar, t]);

  const logIn = useCallback((username, token) => {
    const user = { username, token };
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    socket.connect();
    uploadData(token);
  }, [uploadData]);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser({});
    socket.disconnect();
  }, []);

  useEffect(() => {
    let storage = {}
    try {
      storage = JSON.parse(localStorage.getItem('user')) ?? {};
    } catch {
      storage = {};
    }
    const { username, token } = storage;
    if (username && token) {
      uploadData(token);
      setUser({ username, token });
      socket.connect();
    }
  }, [dispatch, uploadData]);


  useEffect(() => {
    socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
    socket.on('renameChannel', (payload) => dispatch(renameChannel(payload)));
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
      dispatch(removeMessagesByChannelId(payload));
    });
    socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
  }, [dispatch]);



  const value = useMemo(() => ({
    socket, isLogged, logIn, logOut, username: user.username,
  }), [isLogged, logIn, logOut, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
