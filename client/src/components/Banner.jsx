import React from 'react';
import '../scss/banner.scss';


function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

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