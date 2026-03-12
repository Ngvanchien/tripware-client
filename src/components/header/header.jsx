import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import "./header.css";
import { motion } from "framer-motion";
import CarLogin from "../../pages/login/login";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleShowlogin = () => {
    setShowLogin(true);
  };

  const cancelLogin = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setOpen(false);

    message.success("Đăng xuất tài khoản thành công");
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 800); // delay 0.8s
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const initialPath = location.pathname;
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      if (initialPath !== "/") {
        navigate("/", { replace: true });
      }
    }
  }, [location.pathname, navigate]);
  return (
    <header className="client-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/img/logo_tripware3.png" alt="TripWare" />
          </Link>
        </div>

        {/* Menu */}
        <nav className="nav-menu">
          <Link to="/du-thuyen">Tìm du thuyền</Link>
          <Link to="/khach-san">Tìm khách sạn</Link>
          <Link to="/doanh-nghiep">Doanh nghiệp</Link>
          <Link to="/blog">Blog</Link>
        </nav>

        {/* Hotline + Button */}
        <div className="header-right">
          <div className="hotline">
            <FaPhoneAlt className="phone-icon" />
            <span>Hotline: 0922222026</span>
          </div>

          <div className="gf-user-info">
            {!isLoggedIn ? (
              <button onClick={handleShowlogin} className="gf-login-btn">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                Đăng nhập
              </button>
            ) : (
              <button className="gf-login-btn" onClick={() => setOpen(!open)}>
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                {localStorage.getItem("userName")}
              </button>
            )}

            {isLoggedIn && open && (
              <div className="gf-user-dropdown">
                <div
                  className="gf-user-option"
                  onClick={() => navigate("/account/my-oder")}
                >
                  <i className="fa fa-clipboard"></i> Đặt phòng của tôi
                </div>
                <div
                  className="gf-user-option"
                  onClick={() => navigate("/account/account-info")}
                >
                  <i className="fa fa-user"></i> Tài khoản
                </div>
                <div className="gf-user-option" onClick={handleLogout}>
                  <i className="fa fa-sign-out"></i> Đăng xuất
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showLogin && (
        <div className="overlay" onClick={cancelLogin}>
          <motion.div
            className="note-container"
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <CarLogin
              oncancel={cancelLogin}
              onLoginSuccess={handleLoginSuccess}
            />
          </motion.div>
        </div>
      )}
    </header>
  );
}

export default Header;
