import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';



const slideImages = [
 '/images/img1.png',
  '/images/img2.png',
  '/images/img3.png',
  '/images/img4.png',
  '/images/img5.png'
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true
}

const Slideshow = () => {
    return (
      <div class="containter">
      <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
      <Slide {...properties}>
      
        <div className="each-slide">
            <img src={slideImages[0]} alt="" />
          </div>
        
          <div className="each-slide">
            <img src={slideImages[1]} alt="" />
          </div>
          
          <div className="each-slide">
            <img src={slideImages[2]} alt="" />
          </div>

          <div className="each-slide">
            <img src={slideImages[3]} alt="" />
          </div>

          <div className="each-slide">
            <img src={slideImages[4]} alt="" />
          </div>
        
      </Slide>
      </div>
      </div>
      <div class="col-2"></div>
      </div>
    )
}


export default Slideshow;