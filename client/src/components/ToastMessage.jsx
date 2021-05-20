import React, { useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { toastDisplayState } from '../recoil/toastDisplayState';
import '../scss/toast.scss';

function ToastMessage() {
  const toastRef = useRef(null);

  const [toastDisplay, setToastDisplay] = useRecoilState(toastDisplayState);

  const disableToast = () => {
    toastRef.current.classList.add('disabled');
    console.log('click overlay')
    setTimeout(() => {
      setToastDisplay({...toastDisplay, show: false})
    }, 400);
  }

  useEffect(() => {
    const autoDisappear = setTimeout(() => {
      setToastDisplay({...toastDisplay, show: false})
    }, 5400);

    return () => clearTimeout(autoDisappear);
  }, []);

  return (
    <div id="toast" ref={toastRef}>
      <div id="overlay" onClick={disableToast}></div>
      <div className="toast-message-container">
        <div className="message">{toastDisplay.message}</div>
        <div className="progress-bar"></div>
      </div>
    </div>
  )
}

export default ToastMessage
