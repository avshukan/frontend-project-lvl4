import { useState } from "react";
import AuthContext from "./AuthContext";

const KEY = 'token';

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const logIn = (token) => {
        localStorage.setItem(KEY, JSON.stringify({ token }));
        setLoggedIn(true);
    };

    const logOut = () => {
        localStorage.removeItem(KEY);
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
