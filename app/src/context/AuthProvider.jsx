import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useApi } from './ApiProvider';

const AuthContext = createContext({});

const getUserFromLocalStorage = () => {
  try {
    const storage = JSON.parse(localStorage.getItem('user')) ?? {};
    if (typeof storage === 'object') {
      return storage;
    }
    return {};
  } catch {
    return {};
  }
};

function AuthProvider({ children }) {
  const { apiConnect, apiDisconnect } = useApi();

  const [user, setUser] = useState(getUserFromLocalStorage());

  const isLogged = useCallback(() => {
    const { username, token } = user;
    return !!username && !!token;
  }, [user]);

  const logIn = useCallback((username, token) => {
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setUser({ username, token });
    apiConnect();
  }, [apiConnect]);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser({});
    apiDisconnect();
  }, [apiDisconnect]);

  useEffect(() => {
    const { username, token } = user;
    if (username && token) {
      apiConnect();
    }
  }, [user, apiConnect]);

  const value = useMemo(() => ({
    isLogged, logIn, logOut, user,
  }), [isLogged, logIn, logOut, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
