import React from 'react';
import '../scss/closeButton.scss';
import { IoIosClose } from "react-icons/io";

function CloseButton() {
  return (
    <div className="close-button">
      <IoIosClose className="close-icon" />
    </div>
  );
}

export default CloseButton;