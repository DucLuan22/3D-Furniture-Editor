import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customization from "./pages/Customization";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Customization />} path="/customization" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
