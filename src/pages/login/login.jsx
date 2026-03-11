import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { message } from "antd";
import { handleSocialRedirect, login, socialLogin } from "../../api/auth";

const CarLogin = ({ oncancel, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currState, setCurrState] = useState("Đăng nhập");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      message.success("Đăng nhập thành công");

      if (onLoginSuccess) onLoginSuccess();

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    const doRedirect = () => {
      const hasToken = handleSocialRedirect();
      if (hasToken && localStorage.getItem("accessToken")) {
        if (onLoginSuccess) onLoginSuccess();
        navigate("/");
        console.log("Đăng nhập bằng google thành công");
        message.success("Đăng nhập bằng google thành công");
      }
    };
    doRedirect();
  }, [navigate, onLoginSuccess]);

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-content">
          <div className="login-logo">
            <img src="/img/logo_tripware3.png" alt="TripWare Logo" />
          </div>
          <h2 className="form-title">{currState}</h2>

          <form className="auth-form">
            {currState === "Đăng nhập" ? (
              <></>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="Nhập tên của bạn"
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {currState === "Đăng nhập" ? (
              <></>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>
              </>
            )}

            <div className="form-group" style={{ position: "relative" }}>
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "20px",
                  cursor: "pointer",
                  color: "#666",
                  fontSize: "15px",
                }}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              ></i>
            </div>
            {currState === "Đăng nhập" ? (
              <></>
            ) : (
              <>
                <div className="form-group" style={{ position: "relative" }}>
                  <label htmlFor="password" className="form-label">
                    Nhập lại mật khẩu
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-input"
                    placeholder="Nhập mật khẩu"
                  />
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      top: "50px",
                      right: "20px",
                      cursor: "pointer",
                      color: "#666",
                      fontSize: "15px",
                    }}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  ></i>
                </div>
              </>
            )}
            {currState === "Đăng nhập" ? (
              <></>
            ) : (
              <>
                <div className="login-popup-condition">
                  <input type="checkbox" required />
                  <p>
                    Tôi đã đọc và đồng ý với <a>Chính sách & quy định</a> và{" "}
                    <a>Chính sách bảo vệ dữ liệu cá nhân của TripWare</a>
                  </p>
                </div>
              </>
            )}

            <div>
              <button type="submit" className="submit-btn" onClick={onFinish}>
                {currState === "Đăng ký" ? "Đăng ký" : "Đăng nhập"}
              </button>
              <div className="login-options">
                <button type="button" className="forgot-password">
                  Quên mật khẩu
                </button>
                <div className="divider">Hoặc</div>
                <button
                  className="google-login"
                  onClick={(e) => {
                    e.preventDefault();
                    socialLogin("google");
                  }}
                >
                  <img
                    src="/social-google-icon.svg"
                    alt=""
                    style={{ margin: "10px" }}
                  />
                  <p>Đăng nhập bằng Google</p>
                </button>
              </div>
            </div>
          </form>

          {currState === "Đăng nhập" ? (
            <p className="signup-text">
              Bạn chưa có tài khoản?{" "}
              <button
                className="signup-link"
                onClick={() => setCurrState("Đăng ký")}
              >
                Đăng ký tài khoản
              </button>
            </p>
          ) : (
            <p className="signup-text">
              Bạn đã có tài khoản?{" "}
              <button
                className="signup-link"
                onClick={() => setCurrState("Đăng nhập")}
              >
                Đăng nhập ngay
              </button>
            </p>
          )}
        </div>
      </div>

      <div className="login-image">
        <img
          src="/img/hotel_banner.jpg"
          alt="Thuê xe dễ dàng"
          className="car-image"
        />
        <button className="close-btn" onClick={oncancel}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default CarLogin;
