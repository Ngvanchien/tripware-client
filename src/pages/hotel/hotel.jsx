import React, { useState, useEffect } from "react";
import axios from "axios";
import "./hotel.css";
import { useNavigate } from "react-router-dom";
import { FaBed, FaMapMarkerAlt, FaRegStar, FaArrowRight } from "react-icons/fa";
import {
  HiStar,
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";

const Hotel = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const hotelNameList = [
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

  const fetchHotels = async () => {
    try {
      setLoading(true);

      const params = {
        page: 0,
        size: 50,
        accommodation: ["type:hotel"],
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
      setVisibleCount(6); // reset lại khi search
    } catch (error) {
      console.error("Fetch hotel error:", error);
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

    const filtered = hotelNameList.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase()),
    );

    setSuggestions(filtered);
  }, [search]);

  return (
    <div className="hotel-page">
      <section className="hero">
        <video autoPlay muted loop playsInline className="hero-bg">
          <source src="/img/video_hotel.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1>Bạn lựa chọn khách sạn nào?</h1>
          <p>Hàng nghìn khách sạn với mức giá tốt đang chờ đón bạn</p>
        </div>
      </section>

      <div className="search-wrapper">
        <div className="search-box">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Nhập tên khách sạn"
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
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Hạ Long">Hạ Long</option>
            <option value="Phú Quốc">Phú Quốc</option>
            <option value="TP.HCM">TP.HCM</option>
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
        <h2>Khách sạn mới và phổ biến nhất</h2>

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
                  <div className="hotel-card-vertical" key={hotel.id}>
                    {/* IMAGE */}
                    <div className="hotel-image-wrapper-horizontal">
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
                    <div className="hotel-content-vertical">
                      <span className="hotel-city">
                        <FaMapMarkerAlt size={15} color="#954646" />{" "}
                        {hotel.location?.city}
                      </span>

                      <h3 className="hotel-name">{hotel.name}</h3>

                      <div className="hotel-room">
                        <HiOutlineOfficeBuilding size={18} color="#4873df" />
                        <span>{hotel.description}</span>
                      </div>

                      {/* PRICE + BUTTON */}
                      <div className="hotel-bottom">
                        <div className="price-section">
                          <div className="old-price">
                            {(hotel.basePrice * 1.25).toLocaleString()}đ / phòng
                          </div>
                          <div className="new-price">
                            {hotel.basePrice.toLocaleString()}đ / phòng
                          </div>
                        </div>

                        <button
                          className="book-btn"
                          disabled={!isAvailable}
                          onClick={() => navigate(`/hotel/${hotel.id}`)}
                        >
                          {isAvailable ? "Đặt ngay" : "Hết phòng"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* 👇 NÚT XEM THÊM */}
        {!loading && hotels.length > 6 && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/tim-khach-san");
              }}
            >
              Xem tất cả Khách sạn{" "}
              <FaArrowRight style={{ marginLeft: "8px" }} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Hotel;
