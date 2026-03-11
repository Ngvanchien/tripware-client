import React from "react";
import "./company.css";
import { useNavigate } from "react-router-dom";
import {
  FaHotel,
  FaShip,
  FaUsers,
  FaGlobeAsia,
  FaAward,
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
          <h1>Về Chúng Tôi</h1>
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
            TripBooking là nền tảng đặt phòng khách sạn và du thuyền trực tuyến
            giúp khách hàng dễ dàng tìm kiếm, so sánh và đặt dịch vụ du lịch một
            cách nhanh chóng và thuận tiện.
          </p>

          <p>
            Chúng tôi hợp tác với hàng trăm khách sạn, resort và du thuyền cao
            cấp trên khắp Việt Nam để mang đến cho khách hàng những trải nghiệm
            du lịch đáng nhớ.
          </p>

          <p>
            Với công nghệ hiện đại và đội ngũ chuyên nghiệp, chúng tôi không
            ngừng cải thiện dịch vụ để mang lại sự hài lòng cao nhất cho khách
            hàng.
          </p>
        </div>

        <div className="about-right">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="travel"
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="company-why">
        <h2>Tại sao chọn chúng tôi?</h2>

        <div className="why-grid">
          <div className="why-card">
            <div className="stat-icon">
              <FaHotel size={40} />
            </div>

            <h3>Khách sạn đa dạng</h3>
            <p>
              Hơn 500 khách sạn từ bình dân đến cao cấp tại nhiều điểm du lịch
              nổi tiếng.
            </p>
          </div>

          <div className="why-card">
            <div className="stat-icon">
              <FaShip size={40} />
            </div>

            <h3>Du thuyền cao cấp</h3>
            <p>
              Trải nghiệm các du thuyền sang trọng tại Vịnh Hạ Long và nhiều địa
              điểm hấp dẫn.
            </p>
          </div>

          <div className="why-card">
            <div className="stat-icon">
              <FaUsers size={40} />
            </div>

            <h3>Hỗ trợ 24/7</h3>
            <p>
              Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc trong
              quá trình đặt dịch vụ.
            </p>
          </div>

          <div className="why-card">
            <div className="stat-icon">
              <FaGlobeAsia size={40} />
            </div>

            <h3>Đặt phòng nhanh chóng</h3>
            <p>
              Hệ thống đặt phòng hiện đại giúp bạn tìm kiếm và đặt phòng chỉ
              trong vài phút.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="company-services">
        <h2>Dịch vụ của chúng tôi</h2>

        <div className="services-grid">
          <div className="service-card">
            <div className="stat-icon">
              <FaHotel size={35} />
            </div>
            <h3>Đặt phòng khách sạn</h3>
            <p>
              Tìm kiếm và đặt phòng khách sạn với nhiều lựa chọn và mức giá phù
              hợp cho mọi nhu cầu.
            </p>
          </div>

          <div className="service-card">
            <div className="stat-icon">
              <FaShip size={35} />
            </div>
            <h3>Đặt du thuyền</h3>
            <p>
              Khám phá các du thuyền sang trọng với dịch vụ cao cấp và trải
              nghiệm đáng nhớ.
            </p>
          </div>

          <div className="service-card">
            <div className="stat-icon">
              <FaHandshake size={35} />
            </div>
            <h3>Hợp tác doanh nghiệp</h3>
            <p>
              Kết nối với các khách sạn và đối tác du lịch để mở rộng hệ sinh
              thái dịch vụ.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="company-stats">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <FaHotel />
            </div>
            <h2>500+</h2>
            <p>Khách sạn đối tác</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaShip />
            </div>
            <h2>50+</h2>
            <p>Du thuyền cao cấp</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <h2>10,000+</h2>
            <p>Khách hàng</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaMapMarkedAlt />
            </div>
            <h2>100+</h2>
            <p>Điểm đến du lịch</p>
          </div>
        </div>
      </section>
      {/* PARTNERS */}
      <section className="company-partners">
        <h2>Đối tác của chúng tôi</h2>

        <div className="partners-grid">
          <div className="partner">Hotel Partner</div>
          <div className="partner">Cruise Partner</div>
          <div className="partner">Travel Agency</div>
          <div className="partner">Tour Operator</div>
          <div className="partner">Resort Group</div>
        </div>
      </section>

      {/* CTA */}
      <section className="company-cta">
        <h2>Bắt đầu chuyến du lịch của bạn ngay hôm nay</h2>
        <p>
          Khám phá hàng trăm khách sạn và du thuyền tuyệt vời chỉ với vài thao
          tác đơn giản.
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
