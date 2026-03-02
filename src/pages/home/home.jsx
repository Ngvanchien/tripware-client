import React, { useState } from "react";
import "./home.css";

const Home = () => {
  const cruiseList = [
    "Ha Long Paradise Cruise",
    "Athena Cruise",
    "Cruise Nam Dan",
    "Luxury Cruise 5*",
    "Royal Ha Long",
    "Premium Sky Cruise",
    "Paradise Elegance",
    "Ambassador Cruise",
    "Athena Royal Cruise",
  ];

  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = cruiseList.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );

    setSuggestions(filtered);
  };

  const handleSelect = (value) => {
    setKeyword(value);
    setSuggestions([]);
  };

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <video autoPlay muted loop playsInline className="hero-bg">
          <source src="/img/video_cruise.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1>Bạn lựa chọn du thuyền Hạ Long nào?</h1>
          <p>Hơn 100 tour du thuyền hạng sang giá tốt đang chờ bạn</p>
        </div>
      </section>

      {/* SEARCH BOX */}
      <div className="search-wrapper">
        <div className="search-box">
          {/* AUTOCOMPLETE */}
          <div className="autocomplete">
            <input
              type="text"
              placeholder="Nhập tên du thuyền"
              value={keyword}
              onChange={handleChange}
            />

            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((item, index) => (
                  <li key={index} onClick={() => handleSelect(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <select>
            <option>Tất cả địa điểm</option>
            <option>Hạ Long</option>
            <option>Lan Hạ</option>
          </select>

          <select>
            <option>Tất cả mức giá</option>
            <option>Dưới 2 triệu</option>
            <option>2 - 5 triệu</option>
            <option>Trên 5 triệu</option>
          </select>

          <button>Tìm kiếm</button>
        </div>
      </div>

      {/* CRUISE SECTION */}
      <section className="cruise-section">
        <h2>Du thuyền mới và phổ biến nhất</h2>

        <div className="cruise-grid">
          <div className="cruise-card">
            <img src="/img/cruise1.jpg" alt="Cruise" />
            <h3>Luxury Cruise 5*</h3>
            <p>Giá từ 3.500.000đ</p>
          </div>

          <div className="cruise-card">
            <img src="/img/cruise2.jpg" alt="Cruise" />
            <h3>Royal Ha Long</h3>
            <p>Giá từ 2.800.000đ</p>
          </div>

          <div className="cruise-card">
            <img src="/img/cruise3.jpg" alt="Cruise" />
            <h3>Premium Sky Cruise</h3>
            <p>Giá từ 4.200.000đ</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
