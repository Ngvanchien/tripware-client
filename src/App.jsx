import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/main-layout/main";
import Home from "./pages/home/home";
import Hotel from "./pages/hotel/hotel";
useEffect;
function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  (() => {
    const ok = handleSocialRedirect();
    if (ok && localStorage.getItem("accessToken")) {
      navigate("/");
    }
  },
    [navigate]);

  return (
    <div className="app">
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Hotel />} />
          <Route path="/khach-san" element={<Hotel />} />
          <Route path="/du-thuyen" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
