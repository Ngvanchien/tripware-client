import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./find-hotel.css";
import { FaBed, FaMapMarkerAlt, FaRegStar } from "react-icons/fa";
import { HiOutlineOfficeBuilding, HiStar } from "react-icons/hi";

const TimKhachSan = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const [starRatings, setStarRatings] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [sort, setSort] = useState("");

  const navigate = useNavigate();

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const amenityList = [
    "WiFi",
    "Hồ bơi",
    "Gym",
    "Spa",
    "Nhà hàng",
    "Buffet sáng",
    "Xe đưa đón",
    "Bữa sáng",
    "Ăn sáng miễn phí",
    "Bar",
    "24/7 Service",
    "Phòng hạng sang",
    "Sundeck",
    "Hoạt động kayaking",
    "Dịch vụ xe",
    "Sưởi",
    "Dịch vụ tour",
    "Hồ bơi vô cực",
    "Hồ bơi riêng",
    "Nhà hàng ",
    "Ăn sáng ",
    "Tiệc tối",
    "Dịch vụ du lịch",
    "Cho thuê xe",
    "Xe đạp miễn phí",
  ];

  const handleStarChange = (star) => {
    setStarRatings((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star],
    );
  };

  const handleAmenityChange = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const resetFilters = () => {
    setStarRatings([]);
    setAmenities([]);
    setSort("");
  };

  const fetchHotels = async () => {
    try {
      setLoading(true);

      const params = {
        page: 0,
        size: 50,
        accommodation: ["type:hotel"],
      };

      // Filter star
      starRatings.forEach((star) => {
        params.accommodation.push(`starRating:${star}`);
      });

      // Filter tiện ích
      amenities.forEach((amenity) => {
        params.accommodation.push(`amenities~${amenity}`);
      });

      // Sort
      if (sort === "priceAsc") {
        params.sort = "basePrice,asc";
      }

      if (sort === "priceDesc") {
        params.sort = "basePrice,desc";
      }

      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL_FE_PUBLIC}/accommodations`,
        { params },
      );

      setHotels(response?.data?.data?.items || []);
    } catch (error) {
      console.error(error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset page khi filter đổi
  useEffect(() => {
    setCurrentPage(1);
    fetchHotels();
  }, [starRatings, amenities, sort]);

  // Pagination logic
  const totalPages = Math.ceil(hotels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHotels = hotels.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="search-page">
      <div className="search-layout">
        {/* SIDEBAR */}
        <div className="filter-sidebar-section">
          <div className="filter-header-section">
            <h4>Lọc kết quả</h4>
            <button onClick={resetFilters}>Đặt lại</button>
          </div>

          <div className="filter-group-section">
            <h5>Xếp hạng sao</h5>
            {[3, 4, 5].map((star) => (
              <label key={star}>
                <input
                  type="checkbox"
                  checked={starRatings.includes(star)}
                  onChange={() => handleStarChange(star)}
                />
                {star} sao
              </label>
            ))}
          </div>

          <div className="filter-group-section">
            <h5>Tiện ích</h5>
            {amenityList.map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  checked={amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        {/* RESULT */}
        <div className="result-section">
          <div className="result-header">
            <h3>Tìm thấy {hotels.length} kết quả</h3>

            <select
              className="sapxep"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="">Không sắp xếp</option>
              <option value="priceAsc">Giá tăng dần</option>
              <option value="priceDesc">Giá giảm dần</option>
            </select>
          </div>

          {loading ? (
            <p>Đang tải...</p>
          ) : hotels.length === 0 ? (
            <p>Không có kết quả</p>
          ) : (
            <>
              {currentHotels.map((hotel) => {
                const amenitiesList = hotel.amenities
                  ? hotel.amenities.split(",").map((a) => a.trim())
                  : [];

                const isAvailable = hotel.status === "available";

                return (
                  <div className="hotel-card-modern" key={hotel.id}>
                    {/* IMAGE */}
                    <div className="hotel-image-wrapper">
                      <img
                        src={hotel.imageUrls?.[0] || "/img/default.jpg"}
                        alt={hotel.name}
                      />

                      <div className="rating-badge">
                        <HiStar size={18} color="#f59e0b" />
                        {hotel.starRating}.0 (2) đánh giá
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="hotel-content">
                      <div className="hotel-main">
                        <span className="hotel-city">
                          <FaMapMarkerAlt size={15} color="#954646" />{" "}
                          {hotel.location?.city}
                        </span>

                        <h2>{hotel.name}</h2>

                        <div className="hotel-room-count">
                          <HiOutlineOfficeBuilding size={18} color="#4873df" />
                          {hotel.description}
                        </div>

                        <div className="hotel-tags">
                          {amenitiesList.slice(0, 5).map((item, index) => (
                            <span key={index} className="tag">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* PRICE + BUTTON */}
                      <div className="hotel-side">
                        <div className="price-section">
                          <div className="old-price">
                            {(hotel.basePrice * 1.2).toLocaleString()}đ / phòng
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
              })}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    ← Trước
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={currentPage === index + 1 ? "active" : ""}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Tiếp →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimKhachSan;
