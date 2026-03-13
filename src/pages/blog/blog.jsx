import React, { useState } from "react";
import "./blog.css";
import { FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";

const posts = [
  {
    id: 1,
    title: "Top 10 Du Thuyền Sang Trọng Nhất Vịnh Hạ Long",
    category: "Du thuyền",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description:
      "Khám phá những du thuyền sang trọng nhất tại Vịnh Hạ Long cho chuyến du lịch đáng nhớ.",
    author: "Admin",
    date: "10 Tháng 3, 2026",
  },
  {
    id: 2,
    title: "Những Khách Sạn Tốt Nhất Ở Hà Nội",
    category: "Khách sạn",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description:
      "Danh sách khách sạn tốt nhất tại Hà Nội với dịch vụ chất lượng.",
    author: "Admin",
    date: "8 Tháng 3, 2026",
  },
  {
    id: 3,
    title: "Cách Chọn Cabin Du Thuyền Phù Hợp",
    category: "Du thuyền",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    description:
      "Lựa chọn cabin phù hợp sẽ giúp chuyến du thuyền của bạn thoải mái hơn.",
    author: "Admin",
    date: "5 Tháng 3, 2026",
  },
  {
    id: 4,
    title: "Thời Điểm Đẹp Nhất Để Du Lịch Vịnh Hạ Long",
    category: "Kinh nghiệm du lịch",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592",
    description:
      "Thời điểm lý tưởng để tham quan Vịnh Hạ Long và tận hưởng phong cảnh.",
    author: "Admin",
    date: "2 Tháng 3, 2026",
  },
];

const categories = ["Tất cả", "Du thuyền", "Khách sạn", "Kinh nghiệm du lịch"];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");

  const filteredPosts = posts.filter((post) => {
    return (
      (category === "Tất cả" || post.category === category) &&
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="blog-page">
      {/* Banner */}
      <div className="blog-banner">
        <div className="blog-banner-content">
          <h1>Blog Du Lịch</h1>
          <p>Kinh nghiệm du lịch, review khách sạn và du thuyền</p>

          <div className="blog-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="blog-container">
        {/* MAIN */}
        <div className="blog-main">
          <div className="blog-categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={category === cat ? "active" : ""}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {filteredPosts.map((post) => (
              <div className="blog-card" key={post.id}>
                <img src={post.image} alt={post.title} />

                <div className="blog-content">
                  <span className="blog-category">{post.category}</span>

                  <h3>{post.title}</h3>

                  <p>{post.description}</p>

                  <div className="blog-meta">
                    <span>
                      <FaUser /> {post.author}
                    </span>

                    <span>
                      <FaCalendarAlt /> {post.date}
                    </span>
                  </div>

                  <button className="read-more">Xem chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="blog-sidebar">
          <div className="sidebar-box">
            <h3>Bài viết nổi bật</h3>
            <ul>
              <li>Top 10 Du Thuyền Sang Trọng Nhất</li>
              <li>Khách Sạn Tốt Nhất Ở Hà Nội</li>
              <li>Kinh Nghiệm Du Lịch Việt Nam</li>
              <li>Cách Đặt Khách Sạn Giá Rẻ</li>
            </ul>
          </div>

          <div className="newsletter">
            <h3>Nhận tin du lịch</h3>
            <p>Cập nhật ưu đãi và kinh nghiệm mới</p>

            <input placeholder="Email của bạn" />
            <button>Đăng ký</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
