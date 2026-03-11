import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./hotel-detail.css";

import { HiHome, HiStar, HiLocationMarker, HiUser } from "react-icons/hi";

import {
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
  FaBed,
  FaDumbbell,
  FaSpa,
  FaCar,
  FaBicycle,
  FaGlassMartiniAlt,
  FaFire,
  FaShip,
  FaConciergeBell,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const HotelDetail = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [loading, setLoading] = useState(true);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [roomThumbsSwiper, setRoomThumbsSwiper] = useState(null);

  const [roomQuantity, setRoomQuantity] = useState({});
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    promotionCode: "NEWCUSTOMER2026",
    specialRequest: "",
  });
  const selectedRoomIds = Object.entries(roomQuantity)
    .filter(([_, count]) => count > 0)
    .map(([roomId]) => Number(roomId));
  const selectedRooms = rooms
    .map((room) => ({
      ...room,
      quantity: roomQuantity[room.id] || 0,
    }))
    .filter((room) => room.quantity > 0);

  const handleSelectRoom = () => {
    if (!selectedRoom) return;

    increaseRoom(selectedRoom.id); // +1 phòng
    setSelectedRoom(null); // đóng modal
  };
  const handleBooking = async () => {
    try {
      if (selectedRoomIds.length === 0) {
        alert("Bạn chưa chọn phòng");
        return;
      }

      if (!bookingData.checkIn || !bookingData.checkOut) {
        alert("Vui lòng chọn ngày check-in và check-out");
        return;
      }

      setBookingLoading(true);

      const payload = {
        checkIn: bookingData.checkIn + ":00",
        checkOut: bookingData.checkOut + ":00",
        roomIds: selectedRoomIds,
        promotionCode: bookingData.promotionCode || "",
        specialRequest: bookingData.specialRequest || "",
      };

      const token = localStorage.getItem("accessToken");

      await axios.post(`${import.meta.env.VITE_APP_URL_FE}/bookings`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Đặt phòng thành công!");

      setShowBookingModal(false);
    } catch (error) {
      console.error(error);
      alert("Đặt phòng thất bại");
    } finally {
      setBookingLoading(false);
    }
  };

  /* ================= FETCH HOTEL ================= */

  const fetchHotel = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL_FE_PUBLIC}/accommodations/${id}`,
      );

      setHotel(res?.data?.data);
    } catch (error) {
      console.error("Fetch hotel detail error", error);
    }
  };

  /* ================= FETCH ROOMS ================= */

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL_FE_PUBLIC}/accommodations/${id}/rooms`,
      );

      const data = res?.data?.data;

      // API có thể trả object hoặc array
      setRooms(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Fetch rooms error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
    fetchRooms();
  }, [id]);

  /* ================= SCROLL ================= */

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  /* ================= ROOM COUNTER ================= */

  const increaseRoom = (roomId) => {
    setRoomQuantity((prev) => ({
      ...prev,
      [roomId]: (prev[roomId] || 0) + 1,
    }));
  };

  const decreaseRoom = (roomId) => {
    setRoomQuantity((prev) => ({
      ...prev,
      [roomId]: Math.max((prev[roomId] || 0) - 1, 0),
    }));
  };

  /* ================= TOTAL PRICE ================= */

  const totalPrice = rooms.reduce((total, room) => {
    const quantity = roomQuantity[room.id] || 0;
    return total + quantity * (room.pricePerNight || 0);
  }, 0);

  /* ================= MODAL ================= */

  const openRoomModal = (room) => {
    setRoomThumbsSwiper(null);
    setSelectedRoom(room);
  };

  const closeRoomModal = () => {
    setSelectedRoom(null);
    setRoomThumbsSwiper(null);
  };

  /* ================= LOADING ================= */

  if (loading) return <p>Đang tải...</p>;
  if (!hotel) return <p>Không tìm thấy khách sạn</p>;

  /* ================= AMENITIES ================= */

  const amenityIcons = {
    WiFi: <FaWifi />,

    "Hồ bơi": <FaSwimmingPool />,
    "Hồ bơi vô cực": <FaSwimmingPool />,
    "Hồ bơi riêng": <FaSwimmingPool />,

    Gym: <FaDumbbell />,
    Spa: <FaSpa />,

    "Nhà hàng": <FaUtensils />,
    "Tiệc tối": <FaUtensils />,

    "Buffet sáng": <FaUtensils />,
    "Bữa sáng": <FaUtensils />,
    "Ăn sáng": <FaUtensils />,
    "Ăn sáng miễn phí": <FaUtensils />,

    Bar: <FaGlassMartiniAlt />,

    "Xe đưa đón": <FaCar />,
    "Dịch vụ xe": <FaCar />,
    "Cho thuê xe": <FaCar />,

    "Xe đạp miễn phí": <FaBicycle />,

    "24/7 Service": <FaConciergeBell />,

    "Phòng hạng sang": <FaBed />,

    Sundeck: <FaShip />,

    "Hoạt động kayaking": <FaShip />,

    Sưởi: <FaFire />,

    "Dịch vụ tour": <FaMapMarkerAlt />,
    "Dịch vụ du lịch": <FaMapMarkerAlt />,
  };

  const amenitiesList = hotel?.amenities
    ? hotel.amenities.split(",").map((item) => item.trim())
    : [];

  return (
    <div className="hotel-detail-page">
      {/* ================= BREADCRUMB ================= */}

      <div className="breadcrumb">
        <Link to="/">
          <HiHome size={20} />
        </Link>

        <span className="breadcrumb-separator">›</span>

        <Link to="/tim-khach-san">Tìm khách sạn</Link>

        <span className="breadcrumb-separator">›</span>

        <span>{hotel?.name}</span>
      </div>

      {/* ================= HEADER ================= */}

      <div className="hotel-header">
        <div>
          <h1>{hotel.name}</h1>

          <div className="hotel-meta">
            <span className="rating">
              <HiStar color="#f59e0b" /> {hotel.starRating || 5}
            </span>

            <span className="address">
              <FaMapMarkerAlt /> {hotel.location?.address}
            </span>
          </div>
        </div>

        <div className="hotel-price">
          <h2>{hotel.basePrice?.toLocaleString()} đ / phòng</h2>
        </div>
      </div>

      {/* ================= GALLERY ================= */}

      <div className="hotel-gallery">
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="hotel-main-slider"
        >
          {hotel.imageUrls?.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt="hotel" />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          slidesPerView={5}
          spaceBetween={10}
          watchSlidesProgress
          className="hotel-thumb-slider"
        >
          {hotel.imageUrls?.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt="thumb" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= TABS ================= */}

      <div className="hotel-tabs">
        <button onClick={() => scrollToSection("amenities")}>Đặc điểm</button>

        <button onClick={() => scrollToSection("rooms")}>Phòng & giá</button>

        <button onClick={() => scrollToSection("description")}>
          Giới thiệu
        </button>

        <button onClick={() => scrollToSection("reviews")}>Đánh giá</button>
      </div>

      {/* ================= AMENITIES ================= */}

      <section id="amenities" className="hotel-section-s">
        <h2>Đặc điểm nổi bật</h2>

        <div className="amenities">
          {amenitiesList.map((amenity, index) => (
            <div key={index}>
              {amenityIcons[amenity] || <FaWifi />} {amenity}
            </div>
          ))}
        </div>
      </section>

      {/* ================= ROOMS ================= */}

      <section id="rooms" className="hotel-section-s">
        <h2>Các loại phòng</h2>

        <div className="room-list">
          {rooms.map((room) => {
            const quantity = roomQuantity[room.id] || 0;

            return (
              <div className="room-card" key={room.id}>
                <img
                  src={room.imageUrls?.[0]}
                  alt={room.roomName}
                  className="room-img"
                />

                <div className="room-info">
                  <h3
                    className="room-title"
                    onClick={() => openRoomModal(room)}
                  >
                    {room.roomName}
                  </h3>

                  <div className="room-features">
                    <span>
                      <HiHome size={20} /> {room.sizeM2 || "--"} m²
                    </span>

                    <span>
                      <FaBed size={20} /> {room.roomType || "Standard"}
                    </span>

                    <span>
                      <HiUser size={20} /> Tối đa: {room.capacity || 2}
                    </span>
                  </div>
                </div>

                <div className="room-price">
                  <h3>{room.pricePerNight?.toLocaleString()} đ</h3>
                  <span>/PHÒNG</span>
                </div>

                <div className="room-counter">
                  <button onClick={() => decreaseRoom(room.id)}>-</button>

                  <span>{quantity}</span>

                  <button onClick={() => increaseRoom(room.id)}>+</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOOKING */}

        <div className="booking-footer">
          <div className="total-price">
            <span>Tổng tiền</span>
            <h2>{totalPrice.toLocaleString()} đ</h2>
          </div>

          <button
            className="booking-btn-s"
            onClick={() => setShowBookingModal(true)}
          >
            Đặt ngay
          </button>
        </div>
      </section>

      {/* ================= DESCRIPTION ================= */}

      <section id="description" className="hotel-section-s">
        <h2>Giới thiệu khách sạn</h2>
        <p>{hotel.description}</p>
      </section>

      {/* ================= REVIEWS ================= */}

      <section id="reviews" className="hotel-section-s">
        <h2>Đánh giá khách hàng</h2>

        <div className="review-list">
          <div className="review-card">
            <h4>Nguyễn Văn A ⭐⭐⭐⭐⭐</h4>
            <p>Khách sạn rất đẹp, view biển cực kỳ ấn tượng.</p>
          </div>

          <div className="review-card">
            <h4>Trần Thị B ⭐⭐⭐⭐</h4>
            <p>Phòng sạch sẽ, vị trí thuận tiện.</p>
          </div>
        </div>
      </section>

      {/* ================= ROOM MODAL ================= */}

      {selectedRoom && (
        <div className="room-modal-overlay" onClick={closeRoomModal}>
          <div className="room-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeRoomModal}>
              ✕
            </button>

            <div className="modal-content">
              <div className="modal-left">
                <Swiper
                  modules={[Navigation, Thumbs]}
                  navigation
                  thumbs={{
                    swiper:
                      roomThumbsSwiper && !roomThumbsSwiper.destroyed
                        ? roomThumbsSwiper
                        : null,
                  }}
                  className="room-main-slider"
                >
                  {selectedRoom.imageUrls?.length > 0 ? (
                    selectedRoom.imageUrls.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img src={img} alt="room" />
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <img src="/no-image.jpg" alt="no-image" />
                    </SwiperSlide>
                  )}
                </Swiper>

                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setRoomThumbsSwiper}
                  slidesPerView={5}
                  spaceBetween={5}
                  watchSlidesProgress
                  className="room-thumb-slider"
                >
                  {selectedRoom.imageUrls?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img} alt="thumb" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="modal-right">
                <h2>{selectedRoom.roomName || "Tên phòng"}</h2>

                <div className="room-features-modal">
                  <span>
                    <HiHome size={20} /> {selectedRoom.sizeM2 || "--"} m²
                  </span>

                  <span>
                    <FaBed size={20} /> {selectedRoom.roomType || "Standard"}
                  </span>

                  <span>
                    <HiUser size={20} /> Tối đa {selectedRoom.capacity || 2}
                  </span>
                </div>

                <p className="room-description">
                  {selectedRoom.description || "Không có mô tả phòng"}
                </p>

                <h3 className="modal-price">
                  {selectedRoom.pricePerNight?.toLocaleString()} đ / đêm
                </h3>

                <button className="select-room-btn" onClick={handleSelectRoom}>
                  Chọn phòng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showBookingModal && (
        <div
          className="booking-modal-overlay"
          onClick={() => setShowBookingModal(false)}
        >
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowBookingModal(false)}
            >
              ×
            </button>

            <h2 className="modal-title">Xác nhận đặt phòng</h2>
            <div className="selected-room-list">
              <h3>Phòng đã chọn</h3>

              {selectedRooms.length === 0 ? (
                <p>Chưa chọn phòng</p>
              ) : (
                selectedRooms.map((room) => (
                  <div key={room.id} className="selected-room-item">
                    <img src={room.imageUrls?.[0]} alt={room.roomName} />

                    <div className="selected-room-info">
                      <h4>{room.roomName}</h4>

                      <p>
                        {room.quantity} phòng ×{" "}
                        {room.pricePerNight?.toLocaleString()} đ
                      </p>
                    </div>

                    <div className="selected-room-total">
                      {(room.quantity * room.pricePerNight).toLocaleString()} đ
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="booking-form">
              <label>Check In</label>

              <input
                type="datetime-local"
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    checkIn: e.target.value,
                  })
                }
              />

              <label>Check Out</label>

              <input
                type="datetime-local"
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    checkOut: e.target.value,
                  })
                }
              />

              <label>Mã khuyến mãi</label>

              <input
                type="text"
                name="promotionCode"
                value={bookingData.promotionCode}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    promotionCode: e.target.value,
                  })
                }
              />

              <label>Yêu cầu đặc biệt</label>

              <textarea
                placeholder="Ví dụ: chuẩn bị hoa sinh nhật..."
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    specialRequest: e.target.value,
                  })
                }
              />

              <button
                className="confirm-booking-btn"
                onClick={handleBooking}
                disabled={bookingLoading}
              >
                {bookingLoading ? "Đang đặt phòng..." : "Xác nhận đặt phòng"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetail;
