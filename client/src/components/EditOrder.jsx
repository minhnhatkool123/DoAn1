import '../scss/editOrder.scss';
import React, { useState } from 'react';
import Stepper from './Stepper';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import { orderEditDisplayState } from '../recoil/orderEditDisplayState';
import { IoClose } from "react-icons/io5";

const steps = [
  {
    stepNumber: 0,
    description: 'Chờ xác nhận'
  },
  {
    stepNumber: 1,
    description: 'Đã xác nhận'
  },
  {
    stepNumber: 2,
    description: 'Đã thanh toán'
  },
  {
    stepNumber: 3,
    description: 'Thành công'
  }
];

function EditOrder({ order }) {
  const user = useRecoilValue(userState);
  const setOrderEditDisplay = useSetRecoilState(orderEditDisplayState);

  const [currentStep, setCurrentStep] = useState(order.status);

  const handleCancelOrder = () => {
    setCurrentStep(-1);
  }

  const handlePrevStepClick = () => {
    if (currentStep <= 0) return;
    setCurrentStep(step => step - 1);
  }

  const handleNextStepClick = () => {
    if (currentStep >= steps.length - 1) return;
    setCurrentStep(step => step + 1);
  }

  const handleClosing = () => {
    setOrderEditDisplay(false);
  }

  const handleSaveOrderStatus = () => {

  }

  return (
    <div className="edit-order">
      <div id="overlay"></div>
      <div className="edit-order-container">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="btn-group">
          <div className="cancel-order-btn" onClick={handleCancelOrder}>Hủy đơn hàng</div>
          <div className="prev-step-btn" onClick={handlePrevStepClick}>Về trạng thái trước</div>
          <div className="next-step-btn" onClick={handleNextStepClick}>Trạng thái kế tiếp</div>
          <div className="save-btn" onClick={handleSaveOrderStatus}>Lưu</div>
        </div>

        <div className="close-btn" onClick={handleClosing}>
          <IoClose className="close-icon" />
        </div>
      </div>
    </div>
  );
}

export default EditOrder;