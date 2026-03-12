import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/main-layout/main";
import Hotel from "./pages/hotel/hotel";
import TimKhachSan from "./pages/find-hotels/find-hotel";
import Cruise from "./pages/cruise/cruise";
import Blog from "./pages/blog/blog";
import Company from "./pages/company/company";
import HotelDetail from "./pages/hotel-detail/hotel-detail";
import TripLogin from "./pages/login/login";
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
        <Route path="/login" element={<TripLogin />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Hotel />} />
          <Route path="/khach-san" element={<Hotel />} />
          <Route path="/du-thuyen" element={<Cruise />} />
          <Route path="/tim-khach-san" element={<TimKhachSan />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/doanh-nghiep" element={<Company />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
