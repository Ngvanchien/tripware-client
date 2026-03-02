import React, { useState } from "react";
import "./hotel.css";

const hotelList = [
  "Hanoi Grand Hotel",
  "Hanoi Boutique Hotel",
  "Danang Ocean View Resort",
  "Fusion Maia Danang",
  "Saigon Luxury Hotel",
  "The Myst Dong Khoi",
  "Ha Long Paradise Cruise",
  "Athena Cruise",
  "Phu Quoc Sunset Resort",
  "Vinpearl Phu Quoc Resort",
  "Sapa Mountain View Hotel",
  "Topas Ecolodge",
  "Nha Trang Pearl Resort",
  "InterContinental Nha Trang",
  "Hue Imperial Hotel",
  "Can Tho Riverside Hotel",
  "Muine Sand Dunes Resort",
  "Dalat Flower Hotel",
  "Ana Mandara Villas Dalat",
  "Hoi An Riverside Resort",
  "Sunrise Hotel Nguyen",
  "Cruise Nam Dan",
  "Sunrise Hotel Chien",
];

const Hotel = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = hotelList.filter((hotel) =>
      hotel.toLowerCase().includes(value.toLowerCase()),
    );

    setSuggestions(filtered);
  };

  const handleSelect = (hotel) => {
    setSearch(hotel);
    setSuggestions([]);
  };

  return (
    <div className="hotel-page">
      {/* HERO */}
      <section className="hero">
        <video autoPlay muted loop playsInline className="hero-bg">
          <source src="/img/video_hotel.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1>Bạn lựa chọn khách sạn nào?</h1>
          <p>Hàng nghìn khách sạn với mức giá tốt đang chờ đón bạn</p>
        </div>
      </section>

      {/* SEARCH */}
      <div className="search-wrapper">
        <div className="search-box">
          <div className="autocomplete">
            <input
              type="text"
              placeholder="Nhập tên khách sạn"
              value={search}
              onChange={handleChange}
            />

            {suggestions.length > 0 && (
              <ul className="suggestion-list">
                {suggestions.map((hotel, index) => (
                  <li key={index} onClick={() => handleSelect(hotel)}>
                    {hotel}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <select>
            <option>Tất cả địa điểm</option>
            <option>Hà Nội</option>
            <option>Đà Nẵng</option>
            <option>Hạ Long</option>
            <option>Phú Quốc</option>
          </select>

          <select>
            <option>Tất cả mức giá</option>
            <option>Dưới 1 triệu</option>
            <option>1 - 3 triệu</option>
            <option>Trên 3 triệu</option>
          </select>

          <button>Tìm kiếm</button>
        </div>
      </div>

      {/* HOTEL SECTION */}
      <section className="hotel-section">
        <h2>Khách sạn mới và phổ biến nhất</h2>

        <div className="hotel-grid">
          {hotelList.slice(0, 6).map((hotel, index) => (
            <div className="hotel-card" key={index}>
              <img src="/img/cruise1.jpg" alt="Hotel" />
              <h3>{hotel}</h3>
              <p>Giá từ 1.200.000đ</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hotel;
