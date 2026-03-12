import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { message } from "antd";
import {
  handleSocialRedirect,
  login,
  socialLogin,
  register,
} from "../../api/auth";

const TripLogin = ({ oncancel, onLoginSuccess }) => {
  const navigate = useNavigate();

  const [currState, setCurrState] = useState("Đăng nhập");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async (e) => {
    e.preventDefault();

    try {
      if (currState === "Đăng nhập") {
        await login({ email, password });

        message.success("Đăng nhập thành công");

        if (onLoginSuccess) onLoginSuccess();

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        if (!name || !email || !password) {
          message.error("Vui lòng nhập đầy đủ thông tin!");
          return;
        }

        await register({
          name,
          email,
          password,
          phone,
        });

        message.success("Đăng ký thành công");

        setCurrState("Đăng nhập");
        setName("");
        setPhone("");
        setPassword("");
      }
    } catch (error) {
      message.error(error.message || "Có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    const doRedirect = () => {
      const hasToken = handleSocialRedirect();

      if (hasToken && localStorage.getItem("accessToken")) {
        if (onLoginSuccess) onLoginSuccess();

        message.success("Đăng nhập bằng Google thành công");

        navigate("/");
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

          <form className="auth-form" onSubmit={onFinish}>
            {currState === "Đăng ký" && (
              <>
                <div className="form-group">
                  <label className="form-label">Tên</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nhập tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {currState === "Đăng ký" && (
              <>
                <div className="form-group">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-group" style={{ position: "relative" }}>
              <label className="form-label">Mật khẩu</label>

              <input
                type={showPassword ? "text" : "password"}
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
              ></i>
            </div>

            {currState === "Đăng ký" && (
              <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>
                  Tôi đồng ý với <a>Chính sách & quy định</a> và{" "}
                  <a>Chính sách bảo vệ dữ liệu</a>
                </p>
              </div>
            )}

            <button type="submit" className="submit-btn">
              {currState === "Đăng ký" ? "Đăng ký" : "Đăng nhập"}
            </button>

            <div className="login-options">
              <button type="button" className="forgot-password">
                Quên mật khẩu
              </button>

              <div className="divider">Hoặc</div>

              <button
                type="button"
                className="google-login"
                onClick={() => socialLogin("google")}
              >
                <img
                  src="/social-google-icon.svg"
                  alt=""
                  style={{ margin: "10px" }}
                />
                <p>Đăng nhập bằng Google</p>
              </button>
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
        <img src="/img/hotel_banner.jpg" alt="TripWare" className="car-image" />

        <button className="close-btn" onClick={oncancel}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default TripLogin;
