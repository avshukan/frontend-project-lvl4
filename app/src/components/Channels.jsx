import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import queryString from '../routes/queryString';

const Channels = () => {
    return <Button as={Link} to={queryString.loginPath()} state={{ from: location }}>Channels</Button>;
};

export default Channels;
