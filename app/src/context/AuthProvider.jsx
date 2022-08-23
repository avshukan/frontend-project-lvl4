import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const KEY = 'token';

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(logged());
    }, []);

    const logged = () => {
        const token = localStorage.getItem(KEY);
        const result = !!token;
        return result;
    };

    const logIn = (token) => {
        localStorage.setItem(KEY, JSON.stringify({ token }));
        setLoggedIn(true);
    };

    const logOut = () => {
        localStorage.removeItem(KEY);
        setLoggedIn(false);
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

    return (
        <AuthContext.Provider value={{ loggedIn, logged, logIn, logOut, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
