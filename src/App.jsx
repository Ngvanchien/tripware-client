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
import CruiseDetail from "./pages/cruise-detail/cruise-detail";
import Account from "./pages/account";
import MyOders from "./pages/myOders";
import AccountInfo from "./pages/account-info";
import PrivaciesPolicy from "./pages/privacies-policy";
import ChangePassword from "./pages/change-password";
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
        <Route path="/account" element={<Account />}>
          <Route index element={<MyOders />} />
          <Route path="my-oder" element={<MyOders />} />
          <Route path="account-info" element={<AccountInfo />} />
          <Route path="privacies-policy" element={<PrivaciesPolicy />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Hotel />} />
          <Route path="/khach-san" element={<Hotel />} />
          <Route path="/du-thuyen" element={<Cruise />} />
          <Route path="/tim-khach-san" element={<TimKhachSan />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route path="/cruise/:id" element={<CruiseDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/doanh-nghiep" element={<Company />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
