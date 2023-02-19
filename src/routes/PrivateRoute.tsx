import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

/**
 * Check if user is authenticated to access a private route
 * If not, redirect to /login
 * @returns JSX.Element
 */
const PrivateRoute = (): JSX.Element => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
