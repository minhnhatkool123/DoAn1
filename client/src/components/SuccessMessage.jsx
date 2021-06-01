import '../scss/successMessage.scss';
import React from 'react';
import { useRecoilState } from 'recoil';
import { successMessageState } from '../recoil/successMessageState';

function SuccessMessage() {
  const [successMsg, setSuccessMsg] = useRecoilState(successMessageState);

  const closeMessage = () => {
    setSuccessMsg({ ...successMsg, show: false });
  }

  return (
    <React.Fragment>
      {successMsg.show && <div className="success-message">
        <div id="overlay"></div>
        <div className="success-message-container">
          <img src="/img/OK-img.png" className="success-image" alt="" />
          <div className="success-title">Thành công</div>
          <div className="success-description">{successMsg.message}</div>
          <div className="OK-btn" onClick={closeMessage}>OK</div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default SuccessMessage;
