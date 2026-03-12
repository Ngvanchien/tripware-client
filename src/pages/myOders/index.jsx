import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import { message, Table, Spin, Tag } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { Modal, Button } from "antd";

const MyOders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL_FE}/bookings/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setData(response?.data?.data?.items || []);
      } catch (err) {
        console.error(err);
        message.error("Không lấy được dữ liệu!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.patch(
        `${import.meta.env.VITE_APP_URL_FE}/bookings/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      message.success("Huỷ đặt phòng thành công");

      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "cancelled" } : item,
        ),
      );
    } catch (err) {
      console.error(err);
      message.error("Huỷ đặt phòng thất bại");
    }
  };

  const columns = [
    {
      title: "Mã đặt phòng",
      dataIndex: "bookingCode",
      key: "bookingCode",
    },
    // {
    //   title: "Khách hàng",
    //   dataIndex: ["user", "name"],
    //   key: "userName",
    //   render: (_, record) => record.user?.name || "",
    // },
    {
      title: "Ngày nhận phòng",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (value) => (value ? dayjs(value).format("DD/MM/YYYY HH:mm") : ""),
    },
    {
      title: "Ngày trả phòng",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (value) => (value ? dayjs(value).format("DD/MM/YYYY HH:mm") : ""),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => (value ? value.toLocaleString("vi-VN") + " VNĐ" : ""),
    },
    // {
    //   title: "Yêu cầu đặc biệt",
    //   dataIndex: "specialRequests",
    //   key: "specialRequests",
    //   render: (value) => value || "Không có",
    // },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        let text = "";

        switch (status) {
          case "pending":
            color = "orange";
            text = "Chờ xử lý";
            break;
          case "confirmed":
            color = "blue";
            text = "Đã xác nhận";
            break;
          case "checked_in":
            color = "purple";
            text = "Đã nhận phòng";
            break;
          case "completed":
            color = "green";
            text = "Hoàn thành";
            break;
          case "cancelled":
            color = "red";
            text = "Đã huỷ";
            break;
          default:
            text = status;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => {
        if (record.status === "pending" || record.status === "confirmed") {
          return (
            <Button
              danger
              onClick={() => {
                setSelectedBookingId(record.id);
                setOpen(true);
              }}
            >
              Hủy
            </Button>
          );
        }
        return "-";
      },
    },
  ];

  return (
    <div className="orders-container">
      <h2 className="orders-title">Lịch sử đặt phòng</h2>

      <div className="orders-filter">
        <div className="filter-group">
          <i className="fa fa-filter"></i>
          <span>Bộ lọc tìm kiếm</span>
        </div>

        <div className="filter-fields">
          <div className="filter-item-id">
            <input type="text" placeholder="Mã đặt phòng" />
            <i className="fa fa-search"></i>
          </div>

          <div className="filter-item">
            <select>
              <option>Tất cả</option>
              <option>Hanoi Grand Hotel</option>
              <option>Hanoi Boutique Hotel</option>
              <option>Danang Ocean View Resort</option>
              <option>Fusion Maia Danang</option>
              <option>Saigon Luxury Hotel</option>
              <option>The Myst Dong Khoi</option>
              <option>Ha Long Paradise Cruise</option>
              <option>Athena Cruise</option>
              <option>Phu Quoc Sunset Resort</option>
              <option>Vinpearl Phu Quoc Resort</option>
            </select>
          </div>

          <div className="filter-item">
            <select>
              <option>Tất cả</option>
              <option>Chờ xử lý</option>
              <option>Đã xác nhận</option>
              <option>Đã nhận phòng</option>
              <option>Hoàn thành</option>
              <option>Đã huỷ</option>
            </select>
          </div>
        </div>
      </div>

      <div className="orders-table">
        <Spin spinning={loading}>
          <Table
            dataSource={data.map((item) => ({ ...item, key: item.id }))}
            columns={columns}
            pagination={{ pageSize: 5 }}
            style={{ width: "100%" }}
            locale={{
              emptyText: "Không có đơn đặt phòng nào",
            }}
          />
        </Spin>
      </div>

      <Modal
        title="Xác nhận hủy đặt phòng"
        open={open}
        onOk={() => {
          cancelBooking(selectedBookingId);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        okText="Xác nhận hủy"
        cancelText="Quay lại"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc chắn muốn hủy booking này?</p>
        {/* <p>Hành động này không thể hoàn tác.</p> */}
      </Modal>
    </div>
  );
};

export default MyOders;
