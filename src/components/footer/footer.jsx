import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          {/* CỘT 1 - CÔNG TY */}
          <div className="footer-col company">
            <img
              src="/img/logo_tripware3.png"
              alt="TripWare"
              className="footer-logo"
            />

            <p>Công ty TNHH Du Lịch và Dịch Vụ TripWare</p>

            <p>
              Tầng 7, số nhà 25, ngõ 38 phố Yên Lãng, phường Láng Hạ, quận Đống
              Đa, TP. Hà Nội
            </p>

            <p>
              Mã số doanh nghiệp: 0110376372 do Sở Kế hoạch và Đầu tư Thành phố
              Hà Nội cấp ngày 05/06/2023
            </p>
          </div>

          {/* CỘT 2 - GIỚI THIỆU */}
          <div className="footer-col">
            <h4>GIỚI THIỆU</h4>
            <ul>
              <li>Về chúng tôi</li>
              <li>Điều khoản và điều kiện</li>
              <li>Chính sách riêng tư</li>
              <li>Hướng dẫn sử dụng</li>
              <li>Hình thức thanh toán</li>
              <li>Liên hệ</li>
              <li>
                <strong>Hotline: 0922222026</strong>
              </li>
              <li>Email: support@tripware.vn</li>
            </ul>
          </div>

          {/* CỘT 3 - ĐIỂM ĐẾN */}
          <div className="footer-col">
            <h4>ĐIỂM ĐẾN</h4>
            <ul>
              <li>Vịnh Hạ Long</li>
              <li>Vịnh Lan Hạ</li>
              <li>Đảo Cát Bà</li>
            </ul>
          </div>

          {/* CỘT 4 - DU THUYỀN */}
          <div className="footer-col">
            <h4>VỀ CHÚNG TÔI</h4>
            <ul>
              <li>Blog</li>
              <li>Quy định chung và lưu ý</li>
              <li>Câu hỏi thường gặp</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <div className="footer-container bottom-content">
          <span>Bản quyền © 2026 TripWare.</span>

          <img
            src="/img/bocongthuong.png"
            alt="Bộ Công Thương"
            className="cert-logo"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
