import React from 'react';
import '../scss/textError.scss';

function TextError(props) {
  return (
    <div className="error">
      {props.children}
    </div>
  );
}

export default TextError;