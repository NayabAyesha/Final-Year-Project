import React from 'react';
import img1 from '../images/1.png';
import img2 from '../images/2.png';
import img3 from '../images/3.png';
import './Banner.css';

function Banner() {
  return (
    // <div className="slider w-screen">
    //   <div className="slide"><img src={img1} alt="Slide 1" /></div>
    //   {/* <div className="slide slide2"><img src={img2} alt="Slide 2" /></div>
    //   <div className="slide slide3"><img src={img3} alt="Slide 3" /></div> */}
    // </div>

    <div  className="w-screen">
      <div ><img src={img1} alt="Slide 1" /></div>

    </div>
  );
}

export default Banner;
