import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAuth from "../context/useAuth";


const LoginButton = () => {
    const auth = useAuth();
    const location = useLocation();
    
    if (auth.loggedIn) {
        return null;
    }
    return <Button as={Link} to='/login' state={{ from: location }}>Log in</Button>;
};

export default LoginButton;
