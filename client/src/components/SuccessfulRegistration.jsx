import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { signUpState } from '../recoil/entryPointState';
import { motion } from "framer-motion";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const popupVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 60
    }
  }
}

function SuccessfulRegistration() {
  const setSignUp = useSetRecoilState(signUpState);

  return (
    <div className="successful-registration">
      <div id="overlay" onClick={() => setSignUp(false)}></div>
      <motion.div className="container"
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="interface">
          <IoIosCheckmarkCircleOutline className="success-icon" />
          <div className="success-message">
            <div>Một email đã được gửi đến bạn.</div>
            <div>Vui lòng kiểm tra và xác thực tài khoản để hoàn tất đăng ký.</div>
          </div>
          {/* <div className="login-right-now-btn" onClick={() => props.signUpSuccessfully.logInRightNow()}>Đăng nhập ngay</div> */}
        </div>
      </motion.div>
    </div>
  );
}

export default SuccessfulRegistration;