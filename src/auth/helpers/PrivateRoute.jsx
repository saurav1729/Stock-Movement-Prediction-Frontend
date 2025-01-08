import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import { isAuthenticated } from ".";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authCtx = useContext(AuthContext); 
  return authCtx.isLoggedIn ? (
    Component ? <Component {...rest} /> : <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
