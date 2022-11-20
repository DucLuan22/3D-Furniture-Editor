import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Shop/Navbar";
import Customization from "../pages/Customization";
import Home from "../pages/Home";
function MainRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
