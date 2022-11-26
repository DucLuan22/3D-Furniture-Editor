import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Shop/Navbar";
import Cart from "../pages/Cart";
import Customization from "../pages/Customization";
import Home from "../pages/Home";
function MainRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
