import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

function AuthRoutes() {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
    </Routes>
  );
}

export default AuthRoutes;
