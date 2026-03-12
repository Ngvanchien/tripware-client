import axios from "axios";
import { message } from "antd";

const baseURL = import.meta.env.VITE_APP_URL_FE;

export const login = async ({ email, password }) => {
  // Validate input
  if (!email?.trim() || !password?.trim()) {
    throw new Error("Vui lòng nhập đầy đủ email và mật khẩu!");
  }

  try {
    const response = await axios.post(`${baseURL}/auth/access-token`, {
      email: email.trim(),
      password: password.trim(),
    });

    const result = response.data?.data;

    if (!result?.accessToken) {
      throw new Error("Sai email hoặc mật khẩu!");
    }

    const { accessToken, refreshToken, userId, name } = result;

    // Lưu storage
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    if (userId) localStorage.setItem("userId", userId);
    if (name) localStorage.setItem("userName", name);

    return result;
  } catch (error) {
    // Nếu backend trả lỗi
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        throw new Error("Sai email hoặc mật khẩu!");
      }

      if (status === 404) {
        throw new Error("Tài khoản không tồn tại!");
      }

      if (status >= 500) {
        throw new Error("Máy chủ đang gặp lỗi, vui lòng thử lại!");
      }
    }

    // Lỗi mạng hoặc lỗi khác
    if (error.message === "Network Error") {
      throw new Error("Không thể kết nối đến máy chủ!");
    }

    throw new Error("Đăng nhập thất bại, vui lòng thử lại!");
  }
};

export const register = async ({
  name,
  email,
  password,
  phone,
  address,
  dateOfBirth,
}) => {
  try {
    const { data } = await axios.post(`${baseURL}/auth/register`, {
      name,
      email,
      password,
      phone,
      address,
      dateOfBirth,
    });

    return data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data?.message;

      if (message?.toLowerCase().includes("email")) {
        throw new Error("Email đã được đăng ký!");
      }

      throw new Error(message || "Đăng ký thất bại!");
    }

    throw new Error("Không thể kết nối tới máy chủ!");
  }
};

export const socialLogin = async (provider) => {
  try {
    window.location.href = `${baseURL}/auth/social-login?login-type=${provider}`;
  } catch (error) {
    console.error("Social login redirect failed:", error);
    throw new Error("Không thể chuyển hướng đến nhà cung cấp đăng nhập.");
  }
};

export const handleSocialRedirect = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const userId = params.get("userId");
    const userName = params.get("userName");

    if (!accessToken) return false;

    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    if (userId) localStorage.setItem("userId", userId);
    if (userName)
      localStorage.setItem("userName", decodeURIComponent(userName));

    window.history.replaceState({}, document.title, window.location.pathname);

    return true;
  } catch (error) {
    console.error("Error handling social redirect:", error);
    return false;
  }
};
