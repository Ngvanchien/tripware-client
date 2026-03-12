import React from "react";
import Header from "../../components/header/header";
import SidebarAcount from "../../components/SidebarAccount";
import Footer from "../../components/footer/footer";
import "./index.css";
import { Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div className="account-page">
      <Header />
      <div className="account-content">
        <div className="sidebar-account">
          <SidebarAcount />
        </div>

        <div className="account-details">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
