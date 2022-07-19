import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../context/useAuth";

const PrivateRoute = ({children}) => {
    const auth = useAuth();
    const location = useLocation();

    if (auth.loggedIn) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} />;
};

export default PrivateRoute;
