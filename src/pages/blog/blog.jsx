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
    title: "Những Khách Sạn Tốt Nhất Ở Hà Nội Cho Người Lần Đầu Du Lịch",
    category: "Khách sạn",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description:
      "Khám phá những khách sạn tốt nhất tại Hà Nội với dịch vụ chất lượng và vị trí thuận tiện.",
    author: "Admin",
    date: "8 Tháng 3, 2026",
  },
  {
    id: 3,
    title: "Cách Chọn Cabin Du Thuyền Phù Hợp Nhất",
    category: "Du thuyền",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    description:
      "Lựa chọn cabin phù hợp sẽ giúp chuyến du thuyền của bạn trở nên thoải mái và tuyệt vời hơn.",
    author: "Admin",
    date: "5 Tháng 3, 2026",
  },
  {
    id: 4,
    title: "Thời Điểm Đẹp Nhất Để Du Lịch Vịnh Hạ Long",
    category: "Kinh nghiệm du lịch",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592",
    description:
      "Tìm hiểu thời điểm lý tưởng nhất để tham quan Vịnh Hạ Long và tận hưởng phong cảnh tuyệt đẹp.",
    author: "Admin",
    date: "2 Tháng 3, 2026",
  },
  {
    id: 5,
    title: "7 Kinh Nghiệm Khi Đặt Khách Sạn Online",
    category: "Kinh nghiệm du lịch",
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a",
    description:
      "Tránh những sai lầm phổ biến và học cách đặt khách sạn với giá tốt nhất.",
    author: "Admin",
    date: "28 Tháng 2, 2026",
  },
  {
    id: 6,
    title: "Trải Nghiệm Du Thuyền Sang Trọng Tại Việt Nam",
    category: "Du thuyền",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description:
      "Trải nghiệm dịch vụ du thuyền cao cấp cùng khung cảnh biển tuyệt đẹp tại Việt Nam.",
    author: "Admin",
    date: "25 Tháng 2, 2026",
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
        <h1>Blog Du Lịch</h1>
        <p>Kinh nghiệm du lịch, review du thuyền và khách sạn</p>

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

      <div className="blog-container">
        {/* Main */}
        <div className="blog-main">
          {/* Categories */}
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

          {/* Blog Grid */}
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

        {/* Sidebar */}
        <div className="blog-sidebar">
          <h3>Bài viết nổi bật</h3>

          <ul>
            <li>Top 10 Du Thuyền Sang Trọng Nhất Vịnh Hạ Long</li>
            <li>Những Khách Sạn Tốt Nhất Ở Hà Nội</li>
            <li>Kinh Nghiệm Du Lịch Việt Nam</li>
            <li>Cách Đặt Khách Sạn Giá Rẻ</li>
          </ul>

          <h3>Danh mục</h3>

          <ul>
            <li>Du thuyền</li>
            <li>Khách sạn</li>
            <li>Kinh nghiệm du lịch</li>
          </ul>

          <div className="newsletter">
            <h3>Đăng ký nhận tin</h3>
            <p>Nhận kinh nghiệm du lịch và ưu đãi mới nhất</p>

            <input placeholder="Nhập email của bạn" />
            <button>Đăng ký</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
