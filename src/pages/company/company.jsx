import React from "react";
import "./company.css";
import { useNavigate } from "react-router-dom";
import {
  FaHotel,
  FaShip,
  FaUsers,
  FaGlobeAsia,
  FaHandshake,
  FaMapMarkedAlt,
} from "react-icons/fa";

const Company = () => {
  const navigate = useNavigate();

  return (
    <div className="company-page">
      {/* HERO */}
      <section className="company-hero">
        <div className="hero-overlay">
          <h1>Về TripBooking</h1>
          <p>
            Nền tảng đặt phòng khách sạn và du thuyền giúp bạn khám phá những
            điểm đến tuyệt vời với trải nghiệm du lịch hoàn hảo.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="company-about">
        <div className="about-left">
          <h2>Chúng tôi là ai?</h2>

          <p>
            TripWare là nền tảng đặt phòng khách sạn và du thuyền trực tuyến
            giúp khách hàng dễ dàng tìm kiếm, so sánh và đặt dịch vụ du lịch
            nhanh chóng.
          </p>

          <p>
            Chúng tôi hợp tác với hàng trăm khách sạn, resort và du thuyền cao
            cấp trên khắp Việt Nam để mang đến những trải nghiệm nghỉ dưỡng đáng
            nhớ.
          </p>

          <p>
            Với công nghệ hiện đại và đội ngũ chuyên nghiệp, chúng tôi luôn nỗ
            lực mang đến dịch vụ tốt nhất cho khách hàng.
          </p>
        </div>

        <div className="about-right">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="travel"
          />
        </div>
      </section>

      {/* WHY */}
      <section className="company-why">
        <h2>Tại sao chọn chúng tôi?</h2>

        <div className="why-grid">
          <div className="why-card">
            <FaHotel className="why-icon" />
            <h3>Khách sạn đa dạng</h3>
            <p>Hơn 500 khách sạn tại các điểm du lịch nổi tiếng.</p>
          </div>

          <div className="why-card">
            <FaShip className="why-icon" />
            <h3>Du thuyền cao cấp</h3>
            <p>Trải nghiệm du thuyền sang trọng tại nhiều điểm đến.</p>
          </div>

          <div className="why-card">
            <FaUsers className="why-icon" />
            <h3>Hỗ trợ 24/7</h3>
            <p>Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ.</p>
          </div>

          <div className="why-card">
            <FaGlobeAsia className="why-icon" />
            <h3>Đặt phòng nhanh</h3>
            <p>Tìm kiếm và đặt phòng chỉ trong vài phút.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="company-services">
        <h2>Dịch vụ của chúng tôi</h2>

        <div className="services-grid">
          <div className="service-card">
            <FaHotel className="service-icon" />
            <h3>Đặt phòng khách sạn</h3>
            <p>
              Tìm kiếm và đặt phòng khách sạn với nhiều lựa chọn và mức giá phù
              hợp.
            </p>
          </div>

          <div className="service-card">
            <FaShip className="service-icon" />
            <h3>Đặt du thuyền</h3>
            <p>Khám phá các du thuyền sang trọng với dịch vụ cao cấp.</p>
          </div>

          <div className="service-card">
            <FaHandshake className="service-icon" />
            <h3>Hợp tác doanh nghiệp</h3>
            <p>
              Kết nối với khách sạn và đối tác du lịch để mở rộng hệ sinh thái.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="company-stats">
        <div className="stats-container">
          <div className="stat-card">
            <FaHotel className="stat-icon" />
            <h2>500+</h2>
            <p>Khách sạn đối tác</p>
          </div>

          <div className="stat-card">
            <FaShip className="stat-icon" />
            <h2>50+</h2>
            <p>Du thuyền cao cấp</p>
          </div>

          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h2>10,000+</h2>
            <p>Khách hàng</p>
          </div>

          <div className="stat-card">
            <FaMapMarkedAlt className="stat-icon" />
            <h2>100+</h2>
            <p>Điểm đến du lịch</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="company-cta">
        <h2>Bắt đầu chuyến du lịch của bạn</h2>

        <p>
          Khám phá hàng trăm khách sạn và du thuyền chỉ với vài thao tác đơn
          giản.
        </p>

        <button
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/");
          }}
        >
          Khám phá ngay
        </button>
      </section>
    </div>
  );
};

export default Company;
