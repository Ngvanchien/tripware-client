import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../header/header";
import "./main.css";
import Footer from "../footer/footer";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="main-layout">
      <div className="main-header">
        <Header />
      </div>
      <div className={`main-content ${isCollapsed ? "expanded" : ""}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
