import React from "react";
import { Route, Outlet } from "react-router-dom";
import { useAuth } from "../Helper/Context";
import Login from "../Pages/Login/Login";

export default function PrivateRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Login />;
}
