import React from 'react';

function ErrorLoginMessage({ closeErrorMessage, message }) {
  return (
    <div className="error-login-message">
      <div id="overlay"></div>
      <div className="container">
        <div className="message">{message}</div>
        <div className="ok-btn" onClick={() => closeErrorMessage()}>OK</div>
      </div>
    </div>
  );
}

export default ErrorLoginMessage;