import React, { useState } from 'react';
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

function SuccessfulRegistration(props) {
  return (
    <div className="successful-registration">
      <motion.div id="overlay" onClick={() => props.signUpSuccessfully.closeSignUp()}
        // variants={popupVariants}
        // initial="hidden"
        // animate="visible"
        // exit="hidden"
      ></motion.div>
      <motion.div className="container"
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="interface">
          <IoIosCheckmarkCircleOutline className="success-icon" />
          <div className="success-message">Chúc mừng bạn đã đăng ký thành công</div>
          <div className="login-right-now-btn" onClick={() => props.signUpSuccessfully.logInRightNow()}>Đăng nhập ngay</div>
        </div>
      </motion.div>
    </div>
  );
}

export default SuccessfulRegistration;