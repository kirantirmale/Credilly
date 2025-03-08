import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Personal Branding Section */}
        <div className="footer-section">
          <h2 className="footer-title">Kiran Ajay Tirmale</h2>
          <p className="footer-text">
            MERN Stack Developer | React.js | Node.js | MongoDB | UI/UX Enthusiast
          </p>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/kiranajaytirmale" className="social-icon" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/kiran-tirmale" className="social-icon" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:kirantirmale2362001@gmail.com" className="social-icon">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://twitter.com/kiran_tirmale" className="social-icon" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        {/* Skills & Technologies */}
        <div className="footer-section">
          <h3 className="footer-heading">Tech Stack</h3>
          <ul className="footer-list">
            <li>React.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            <li>JavaScript (ES6+)</li>
            <li>HTML5 & CSS3</li>
            <li>REST APIs</li>
            <li>UI/UX Design</li>
          </ul>
        </div>

        {/* Work & Services */}
        <div className="footer-section">
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-list">
            <li>Full Stack Web Development</li>
            <li>Frontend UI/UX Design</li>
            <li>Backend API Development</li>
            <li>Database Management</li>
            <li>Performance Optimization</li>
            <li>Freelance & Consulting</li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-list">
            <li><i className="fas fa-envelope"></i> kirantirmale2362001@gmail.com</li>
            <li><i className="fab fa-whatsapp"></i> +91 9607128284</li>
            <li><i className="fab fa-telegram"></i> @me_kirannn</li>
            <li><i className="fas fa-map-marker-alt"></i> Pune, Maharashtra, India</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
