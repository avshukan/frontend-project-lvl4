import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAuth from "../context/useAuth";
import queryString from '../routes/queryString';

const LoginButton = () => {
    const auth = useAuth();
    const location = useLocation();
    
    if (auth.loggedIn) {
        return null;
    }
    return <Button as={Link} to={queryString.loginPath()} state={{ from: location }}>Log in</Button>;
};

export default LoginButton;
