import axios from "axios";
import { message } from "antd";

const baseURL = import.meta.env.VITE_APP_URL_FE;

export const login = async ({ email, password }) => {
  try {
    if (!email?.trim() || !password?.trim()) {
      message.warning("Vui lòng nhập đầy đủ email và mật khẩu!");
      return null;
    }

    const { data } = await axios.post(`${baseURL}/auth/access-token`, {
      email,
      password,
    });

    const result = data?.data;
    if (!result?.accessToken) {
      throw new Error("Phản hồi từ máy chủ không hợp lệ!");
    }

    const { accessToken, refreshToken, userId, name } = result;

    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    if (userId) localStorage.setItem("userId", userId);
    if (name) localStorage.setItem("userName", name);

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.message;
      message.error(msg);
      throw new Error(msg);
    } else {
      const msg = error.message || "Đã có lỗi khi đăng nhập!";
      message.error(msg);
      throw new Error(msg);
    }
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
