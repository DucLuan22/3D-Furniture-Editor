import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { reset } from "../../slice/authSlice";
function Navbar() {
  const [isDrop, setIsDrop] = useState(false);
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(reset());
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="shadow-md w-screen fixed top-0 left-0 z-10">
      <div className="flex items-center justify-evenly md:justify-around  bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-3xl cursor-pointer flex items-center text-gray-800">
          iFurniture
        </div>
        <div className="w-[250px] md:w-[30%] mr-10 md:mr-0"></div>
        <div className="text-3xl absolute right-8 top-6 md:hidden">
          <AiOutlineMenu onClick={() => setIsDrop(!isDrop)} />
        </div>
        <ul
          className={`text-gray-800 md:flex md:items-center link-list gap-8 font-semibold text-xl md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full 
        md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
          isDrop ? "top-20" : "top-[-490px]"
        }`}
        >
          <li className="hover:text-gray-500 duration-500 my-7 md:my-0">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-gray-500 duration-500 my-7 md:my-0">
            <Link to="/customization">Customization</Link>
          </li>

          <li className="hover:text-gray-500 duration-500 my-7 md:my-0">
            {!isLogin ? (
              <Link to="/auth/login">Login</Link>
            ) : (
              <nav onClick={() => handleLogout()} className="cursor-pointer">
                Logout
              </nav>
            )}
          </li>

          <li className="hover:text-gray-500 duration-500 my-7 md:my-0 relative">
            <Link to="/cart">
              <AiOutlineShoppingCart className="inline text-2xl" />
            </Link>
            <span className="bg-gray-800 text-white absolute cart-notify bottom-4 left-3 text-sm px-[7px] p-[1px] font-bold rounded-full">
              0
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
