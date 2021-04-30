import React from 'react';

function ErrorLoginMessage(props) {
  return (
    <div className="error-login-message">
      <div id="overlay"></div>
      <div className="container">
        <div className="message">Tài khoản hoặc mật khẩu không đúng</div>
        <div className="ok-btn" onClick={() => props.closeErrorMessage()}>OK</div>
      </div>
    </div>
  );
}

export default ErrorLoginMessage;