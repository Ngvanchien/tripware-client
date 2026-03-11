import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cruise.css";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { HiStar, HiOutlineOfficeBuilding } from "react-icons/hi";

const Cruise = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const cruiseNameList = [
    "Ha Long Paradise Cruise",
    "Athena Cruise",
    "Scarlet Pearl Cruise",
    "Ambassador Cruise",
    "Orchid Cruise",
    "Stellar of the Seas",
  ];

  const fetchHotels = async () => {
    try {
      setLoading(true);

      const params = {
        page: 0,
        size: 50,
        accommodation: ["type:cruise"],
      };

      if (search?.trim()) {
        params.accommodation.push(`name~${search.trim()}`);
      }

      if (location) {
        params.accommodation.push(`address~${location}`);
      }

      if (priceRange === "low") {
        params.accommodation.push("basePrice<1000000");
      }

      if (priceRange === "mid") {
        params.accommodation.push("basePrice>1000000");
        params.accommodation.push("basePrice<3000000");
      }

      if (priceRange === "high") {
        params.accommodation.push("basePrice>3000000");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL_FE_PUBLIC}/accommodations`,
        { params },
      );

      const items = response?.data?.data?.items || [];
      setHotels(items);
      setVisibleCount(6);
    } catch (error) {
      console.error("Fetch cruise error:", error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = cruiseNameList.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase()),
    );

    setSuggestions(filtered);
  }, [search]);

  return (
    <div className="hotel-page">
      <section className="hero">
        <video autoPlay muted loop playsInline className="hero-bg">
          <source src="/img/video_cruise.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1>Bạn lựa chọn du thuyền Hạ Long nào?</h1>
          <p>Hơn 100 tour du thuyền hạng sang giá tốt đang chờ bạn</p>
        </div>
      </section>

      <div className="search-wrapper">
        <div className="search-box">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Nhập tên du thuyền"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />

            {showDropdown && suggestions.length > 0 && (
              <ul className="suggestion-dropdown">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSearch(item);
                      setShowDropdown(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <select onChange={(e) => setLocation(e.target.value)}>
            <option value="">Tất cả địa điểm</option>
            <option value="Hạ Long">Hạ Long</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>

          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option value="">Tất cả mức giá</option>
            <option value="low">Dưới 1 triệu</option>
            <option value="mid">1 - 3 triệu</option>
            <option value="high">Trên 3 triệu</option>
          </select>

          <button onClick={fetchHotels}>Tìm kiếm</button>
        </div>
      </div>

      <section className="hotel-section">
        <h2>Du thuyền mới và phổ biến nhất</h2>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="hotel-grid">
            {hotels.length === 0 ? (
              <p>Không tìm thấy kết quả</p>
            ) : (
              hotels.slice(0, visibleCount).map((hotel) => {
                const isAvailable = hotel.status === "available";

                return (
                  <div className="cruise-card-vertical" key={hotel.id}>
                    {/* IMAGE */}
                    <div className="cruise-image-wrapper-horizontal">
                      <img
                        className="img-hotel"
                        src={hotel.imageUrls?.[0] || "/img/default.jpg"}
                        alt={hotel.name}
                      />

                      <div className="rating-badge-horizontal">
                        <HiStar size={15} color="#f59e0b" />
                        {hotel.starRating || 5}.0 (0) đánh giá
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="cruise-content-vertical">
                      <span className="hotel-city">
                        <FaMapMarkerAlt size={15} color="#954646" />
                        {hotel.location?.city}
                      </span>

                      <h3 className="hotel-name">{hotel.name}</h3>

                      <div className="hotel-room">
                        <HiOutlineOfficeBuilding size={18} color="#4873df" />
                        <span>{hotel.description}</span>
                      </div>

                      <div className="hotel-bottom">
                        <div className="price-section">
                          <div className="old-price">
                            {(hotel.basePrice * 1.25).toLocaleString()}đ / tour
                          </div>

                          <div className="new-price">
                            {hotel.basePrice.toLocaleString()}đ / tour
                          </div>
                        </div>

                        <button
                          className="book-btn"
                          disabled={!isAvailable}
                          onClick={() => navigate(`/cruise/${hotel.id}`)}
                        >
                          {isAvailable ? "Đặt ngay" : "Hết chỗ"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {!loading && hotels.length > 6 && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/tim-du-thuyen");
              }}
            >
              Xem tất cả Du thuyền
              <FaArrowRight style={{ marginLeft: "8px" }} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cruise;
