import React from 'react';
import { useNavigate } from 'react-router-dom';
// import heroVideo from '../videos/video-1.mp4';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="my-background">
        {/* Video Background */}
        {/* <video autoPlay loop muted className="video-bg">
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

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
            <div class="component_scene1__Q0dZX">
                <div>
                  <div class="component_cube__e4Gqk component_cube1__2g4ee">
                    <div class="component_front__gWTUe">
                    </div>
                    <div class="component_back__M2Za8">
                    </div>
                    <div class="component_right__773_z">
                    </div>
                    <div class="component_left__eMe1a">

                    </div>
                    <div class="component_top__n3EL3"></div>
                    <div class="component_bottom__55ite"></div>
                  </div>
                  <div class="component_cube__e4Gqk component_cube2__jr9JE">
                    <div class="component_front__gWTUe"></div>
                    <div class="component_back__M2Za8"></div>
                    <div class="component_right__773_z"></div>
                    <div class="component_left__eMe1a"></div>
                    <div class="component_top__n3EL3"></div>
                    <div class="component_bottom__55ite"></div>
                  </div>
                  <div class="component_cube__e4Gqk component_cube3__XUq_p">
                    <div class="component_front__gWTUe"></div>
                    <div class="component_back__M2Za8"></div>
                    <div class="component_right__773_z"></div>
                    <div class="component_left__eMe1a"></div>
                    <div class="component_top__n3EL3"></div>
                    <div class="component_bottom__55ite"></div>
                  </div>
                  <div class="component_cube__e4Gqk component_cube4__D4WBd">
                    <div class="component_front__gWTUe"></div>
                    <div class="component_back__M2Za8"></div>
                    <div class="component_right__773_z"></div>
                    <div class="component_left__eMe1a"></div>
                    <div class="component_top__n3EL3"></div>
                    <div class="component_bottom__55ite"></div>
                  </div>
                  <div class="component_cube__e4Gqk component_cube5__LEwcB">
                    <div class="component_front__gWTUe"></div>
                    <div class="component_back__M2Za8"></div>
                    <div class="component_right__773_z"></div>
                    <div class="component_left__eMe1a"></div>
                    <div class="component_top__n3EL3"></div>
                    <div class="component_bottom__55ite"></div>
                  </div>
                  <div class="component_cube__e4Gqk component_cube6__x5wO2">
                    <div class="component_front__gWTUe"></div>
                    <div class="component_back__M2Za8"></div>
                    <div class="component_right__773_z"></div>
                    <div class="component_left__eMe1a"></div>
                    <div class="component_top__n3EL3"></div>
                    <div class="component_bottom__55ite"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
