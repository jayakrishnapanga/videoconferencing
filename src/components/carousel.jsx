
// import './slick-custom.css'; 

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
    // Slick carousel settings
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      
    };
  
    return (
      <div style={{ maxWidth: '300px', }}>
     
        <Slider  {...settings}>
          <div >
            <img
              src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
              alt="Slide 1"
              style={{ width: '100%', height: '300px', objectFit: 'contain', }}
            />
            <p className='text-slate-50 text-sm'>click start meeting to start or create newmeeting</p>
          </div>
          <div >
            <img
            src="https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg"
              alt="Slide 2"
              style={{ width: '100%', height: '300px', objectFit: 'contain' }}
            />
                  <p className='text-slate-50 text-sm'>your meeting is asfe no one can join unless you invited</p>
          </div>
          {/* <div >
            <img
              src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
              alt="Slide 3"
              style={{ width: '100%', height: '300px', objectFit: 'contain' }}
            />
          </div> */}
        </Slider>
      </div>
    );
  };
  
  
  export default Carousel;
  