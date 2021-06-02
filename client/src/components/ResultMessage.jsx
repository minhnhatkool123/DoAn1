import '../scss/successMessage.scss';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { resultMessageState, messageContent } from '../recoil/resultMessageState';

function SuccessMessage() {
  const [successMsg, setSuccessMsg] = useRecoilState(resultMessageState);
  const content = useRecoilValue(messageContent);

  const closeMessage = () => {
    setSuccessMsg({ ...successMsg, show: false });
  }

  return (
    <React.Fragment>
      {successMsg.show && <div className="result-message">
        <div id="overlay"></div>
        <div className="result-message-container">
          <img src={content.image} className="result-image" alt="" />
          <div className="result-title">{content.title}</div>
          <div className="result-description">{successMsg.message}</div>
          <div className="accept-btn" onClick={closeMessage}>{content.acceptButtonName}</div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default SuccessMessage;
