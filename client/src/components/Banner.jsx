import React from 'react';
import '../scss/banner.scss';


function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <div className="l-12 slider-container">
          <div className="slider" style={{ backgroundImage: `url('/img/slider-3.png')` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Banner;