import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useRollbar } from '@rollbar/react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocket } from './SocketProvider';
import fetchDataThunk from '../slices/fetchDataThunk';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const { socket } = useSocket();

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
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setUser({ username, token });
    socket.connect();
    uploadData(token);
  }, [socket, uploadData]);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser({});
    socket.disconnect();
  }, [socket]);

  useEffect(() => {
    let storage = {};
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
  }, [dispatch, uploadData, socket]);

  const value = useMemo(() => ({
    isLogged, logIn, logOut, username: user.username,
  }), [isLogged, logIn, logOut, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
