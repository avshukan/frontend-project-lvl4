import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAuth from "../context/useAuth";
import queryString from '../routes/queryString';

const Messages = () => {
    return <Button as={Link} to={queryString.loginPath()} state={{ from: location }}>Messages</Button>;
};

export default Messages;
