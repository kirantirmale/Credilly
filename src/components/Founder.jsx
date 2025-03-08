import React from 'react';
import kiran from '../images/founder/founder-car.jpg';
import Arrow from '../images/icon/Arrow.png';
import { useNavigate } from 'react-router-dom';

const Founder = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="founder-section">
                <div className="image-container">
                    <img src={kiran} alt="About Intelisync" className="founder-image" />
                </div>
                <div className="text-container">
                    <div className="heading-container">
                        <span className="heading-line"></span>
                        <span className="heading-text">Browse by Brands</span>
                    </div>
                    <h1 className="founder-name">Explore by vehicle type</h1>
                    <p className="founder-description">
                        The automotive industry has evolved significantly, introducing cutting-edge technologies and innovations that redefine driving experiences. From <strong>high-performance sports cars</strong> to <strong>luxury sedans</strong> and <strong>electric vehicles (EVs)</strong>, each brand brings unique advancements in design, engineering, and efficiency.
                        <br /><br />
                        Leading brands such as <strong>Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz, Tesla, and Audi</strong> continue to push the boundaries of speed, comfort, and sustainability. Electric and hybrid vehicles, like the <strong>Tesla Model S, Porsche Taycan, and BMW iX</strong>, showcase the shift towards eco-friendly mobility without compromising on performance.
                        <br /><br />
                        Performance enthusiasts admire the raw power of <strong>V8, V10, and V12 engines</strong> found in supercars, while technological advancements like <strong>adaptive cruise control, autonomous driving, and AI-powered infotainment systems</strong> enhance the driving experience. Innovations in aerodynamics, lightweight materials, and hybrid powertrains contribute to both speed and fuel efficiency.
                        <br /><br />
                        Whether it's the elegance of a <strong>Rolls-Royce</strong>, the thrill of a <strong>Lamborghini Huracán</strong>, or the futuristic appeal of a <strong>Rivian R1T</strong>, the automotive world continues to shape the future of transportation with groundbreaking designs and engineering excellence.
                    </p>

                    <button className="connect-button" onClick={() => navigate('/contact')}>
                        Connect Brands
                        <img src={Arrow} alt="Arrow" className="button-arrow" />
                    </button>
                </div>
            </section>
        </>
    );
};

export default Founder;
