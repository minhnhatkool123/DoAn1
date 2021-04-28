import React from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

function SuccessfulRegistration(props) {
  return (
    <div className="successful-registration">
      <div id="overlay" onClick={() => props.signUpSuccessfully.closePopup()}></div>
      <div className="container">
        <div className="interface">
          <IoIosCheckmarkCircleOutline className="success-icon" />
          <div className="success-message">Chúc mừng bạn đã đăng ký thành công</div>
          <div className="login-right-now-btn" onClick={() => props.signUpSuccessfully.logInRightNow()}>Đăng nhập ngay</div>
        </div>
      </div>
    </div>
  );
}

export default SuccessfulRegistration;