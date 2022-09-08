import { useCallback, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage, fetchData } from "../slices/dataSlice";

const KEY = 'token';

const socket = io({autoConnect: false});

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
}

const AuthProvider = ({ children }) => {
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
        console.log('login', socket.listeners('newMessage'));
    };

    const logOut = () => {
        localStorage.removeItem(KEY);
        setIsLogged(false);
        socket.disconnect();
        console.log('logout', socket.listeners('newMessage'));
    };

    useEffect(() => {
        const isToken = hasToken();
        setIsLogged(isToken);
        if (isToken) {
            socket.connect();
          initFetchData();
        }
        socket.on('newMessage', (payload) => {
          console.log('get new message');
          dispatch(addMessage(payload));
        });
  }, [dispatch, initFetchData]);

    return (
        <AuthContext.Provider value={{ socket, isLogged, logged: hasToken, logIn, logOut, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
