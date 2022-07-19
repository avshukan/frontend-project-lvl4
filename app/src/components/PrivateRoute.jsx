import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../context/useAuth";
import queryString from '../routes/queryString';

const PrivateRoute = ({children}) => {
    const auth = useAuth();
    const location = useLocation();

    if (auth.logged()) {
        return children;
    }
    return <Navigate to={queryString.loginPath()} state={{ from: location }} />;
};

export default PrivateRoute;
