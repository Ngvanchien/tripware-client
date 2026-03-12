import React from "react";
import "./index.css";

const AccountInfo = () => {
  return (
    <div className="account-info-container">
      <h2 className="account-info-title">Thông tin tài khoản</h2>
      <div className="account-info-header">
        <div className="account-info-avatar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="avatar"
          />
          <button className="avatar-upload-btn">
            <i className="fa fa-camera"></i>
          </button>
        </div>
        <div className="account-info-user">
          <div className="account-info-name">
            {localStorage.getItem("userName")}
          </div>
          <div className="account-info-join">Tham gia: 29/04/2025</div>
        </div>
        <div className="account-info-actions">
          <button className="edit-btn">
            <i className="fa fa-pen"></i> Chỉnh sửa thông tin
          </button>
          <button className="delete-btn">Xoá tài khoản</button>
        </div>
      </div>

      <div className="account-info-form">
        <div className="form-row">
          <div className="form-group">
            <label>Ngày sinh</label>
            <div className="input-icon">
              <input type="text" value="15/08/2003" disabled />
              <i className="fa fa-calendar"></i>
            </div>
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <input type="text" value="Nam" disabled />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group phone-group error">
            <label>Số điện thoại</label>
            <div className="input-icon phone-verify">
              <input type="text" placeholder="Số điện thoại" disabled />
              <i className="fa fa-exclamation-triangle error-icon"></i>
              <button className="verify-btn active">Xác thực</button>
            </div>
            <div className="error-text">
              Vui lòng xác thực số điện thoại để sử dụng các dịch vụ của
              TripWare
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <div className="input-icon">
              <input
                type="text"
                value="nguyencnguyen.170703@gmail.com"
                disabled
              />
              <i className="fa fa-check-circle success"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
