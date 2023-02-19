import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const PrivateRoute = () => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
