import React, { useState } from "react";
import "./index.css";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { key: "account", label: "Tài khoản của tôi", path: "account-info" },
  { key: "orders", label: "Đặt phòng của tôi", path: "my-oder" },
  { key: "terms", label: "Điều khoản và pháp lý", path: "privacies-policy" },
  { key: "password", label: "Đổi mật khẩu", path: "change-password" },
];

const SidebarAccount = () => {
  const [active, setActive] = useState("orders");
  const navigate = useNavigate();
  const handleClick = (item) => {
    setActive(item.key);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="sidebar-account">
      {menuItems.map((item) => (
        <div
          key={item.key}
          className={`sidebar-account-item${active === item.key ? " active" : ""}`}
          onClick={() => handleClick(item)}
        >
          {item.label}
        </div>
      ))}
      <div className="sidebar-account-divider" />
    </div>
  );
};

export default SidebarAccount;
