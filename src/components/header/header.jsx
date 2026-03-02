import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import "./header.css";

function Header() {
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

          <button className="contact-btn">Đăng nhập</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
