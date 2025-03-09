import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../videos/video-2.mp4'; // Import video

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="my-background">
        {/* Video Background */}
        <video autoPlay loop muted className="video-bg">
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="main-star">
          <div className='main'>
            <div className='left'>
              <div className="hero-content">
                <span className='hero-new'>
                  <button className="new-btn">NEW</button> 
                  <span className='hp'> Latest Integration Just Arrived</span>
                </span>
                <h1>Drive Your <span className='span1'> Dream </span> Car..</h1>
                <p>
                  Choose from a variety of our amazing vehicles to rent for your next adventure or business trip.
                </p>
                <button className="btn" onClick={() => navigate('/contact')}>Let's Book Now</button>
              </div>
            </div>

            <div className='right'>
              {/* Right section if needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
