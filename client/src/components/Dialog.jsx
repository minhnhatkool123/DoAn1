import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { dialogState } from '../recoil/dialogState';
import '../scss/dialog.scss';

function Dialog() {
  const [dialog, setDialog] = useRecoilState(dialogState);

  const dialogRef = useRef(null);

  const handleCancelClick = () => {
    closeDialog();
  }

  const handleAcceptClick = () => {
    closeDialog();
    dialog.func();
  }

  const closeDialog = () => {
    setDialog({...dialog, show: false});
  }

  return (
    <React.Fragment>
      {dialog.show && <div className="dialog" ref={dialogRef}>
        <div id="overlay"></div>
        <div className="dialog-container">
          <div className="message">{dialog.message}</div>
          <div className="option-btn-group">
            <div className="cancel-btn" onClick={handleCancelClick}>Hủy</div>
            <div className="accept-btn" onClick={handleAcceptClick}>{dialog.acceptButtonName}</div>
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default Dialog;
