import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./hotel-detail.css";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
} from "react-icons/fa";
import { HiStar } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const HotelDetail = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const fetchHotel = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL_FE_PUBLIC}/accommodations/${id}`,
      );

      const data = res?.data?.data;

      setHotel(data);
      setRooms(data?.rooms || []);
    } catch (error) {
      console.error("Fetch hotel detail error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (!hotel) return <p>Không tìm thấy khách sạn</p>;

  return (
    <div className="hotel-detail-page">
      <div className="breadcrumb">
        <Link to="/">
          <HiHome size={20} />
        </Link>

        <span className="breadcrumb-separator">›</span>

        <Link to="/tim-khach-san">Tìm khách sạn</Link>

        <span className="breadcrumb-separator">›</span>

        <span>{hotel?.name}</span>
      </div>
      {/* HEADER */}
      <div className="hotel-header">
        <div>
          <h1>{hotel.name}</h1>

          <div className="hotel-meta">
            <span className="rating">
              <HiStar color="#f59e0b" /> {hotel.starRating || 5} (0 đánh giá)
            </span>

            <span className="address">
              <FaMapMarkerAlt /> {hotel.location?.address}
            </span>
          </div>
        </div>

        <div className="hotel-price">
          <h2>{hotel.basePrice?.toLocaleString()} đ / phòng</h2>
          <span className="old-price">
            {(hotel.basePrice * 1.25).toLocaleString()} đ
          </span>
        </div>
      </div>

      {/* GALLERY */}
      <div className="hotel-gallery">
        {/* ẢNH LỚN */}
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

        {/* THUMBNAIL */}
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

      {/* AMENITIES */}
      <section className="hotel-section-amenities">
        <h2>Đặc điểm nổi bật</h2>

        <div className="amenities">
          <div>
            <FaWifi /> Wifi miễn phí
          </div>

          <div>
            <FaSwimmingPool /> Bể bơi ngoài trời
          </div>

          <div>
            <FaUtensils /> Nhà hàng
          </div>

          <div>
            <FaWifi /> Lễ tân 24h
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section className="hotel-section-amenities">
        <h2>Các loại phòng & giá</h2>

        <div className="room-list">
          {rooms.length === 0 && <p>Chưa có phòng</p>}

          {rooms.map((room) => (
            <div className="room-card" key={room.id}>
              <img src={room.imageUrls?.[0]} alt="room" />

              <div className="room-info">
                <h3>{room.name}</h3>

                <p>
                  {room.size} m² • {room.bedType}
                </p>

                <p>Tối đa {room.maxGuests} người</p>
              </div>

              <div className="room-price">
                <h3>{room.price?.toLocaleString()} đ</h3>

                <button>Chọn phòng</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="hotel-section-amenities">
        <h2>Giới thiệu khách sạn</h2>

        <p>{hotel.description}</p>

        <p>
          Tọa lạc tại vị trí trung tâm, khách sạn mang đến trải nghiệm nghỉ
          dưỡng thoải mái với hệ thống phòng hiện đại, tầm nhìn đẹp và nhiều
          tiện ích cao cấp.
        </p>
      </section>

      {/* REVIEWS */}
      <section className="hotel-section-amenities">
        <h2>Đánh giá khách hàng</h2>

        <div className="review-list">
          <div className="review-card">
            <h4>Nguyễn Văn A ⭐⭐⭐⭐⭐</h4>
            <p>
              Khách sạn rất đẹp, view biển cực kỳ ấn tượng. Nhân viên thân
              thiện.
            </p>
          </div>

          <div className="review-card">
            <h4>Trần Thị B ⭐⭐⭐⭐</h4>
            <p>Phòng sạch sẽ, vị trí thuận tiện.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelDetail;
