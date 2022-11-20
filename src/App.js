import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customization from "./pages/Customization";
import AuthRoutes from "./routes/AuthRoutes";
import MainRoutes from "./routes/MainRoutes";
import { reset, setLoggedUser } from "./slice/authSlice";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setLoggedUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainRoutes />} path="/*" />
          <Route element={<AuthRoutes />} path="/auth/*" />
          <Route element={<Customization />} path="/customization" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
