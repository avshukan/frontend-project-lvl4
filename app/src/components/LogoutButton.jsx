import { Button } from "react-bootstrap";
import useAuth from "../context/useAuth";


const LogoutButton = () => {
    const auth = useAuth();

    if (!auth.loggedIn) {
        return null;
    }
    return <Button onClick={auth.logout} >Log out</Button>;
};

export default LogoutButton;
