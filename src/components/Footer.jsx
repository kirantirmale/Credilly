import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Branding Section */}
        <div className="footer-section">
          <h2 className="footer-title">Credily</h2>
          <p className="footer-text">
            Your trusted destination for premium cars, offering the best selection of luxury and performance vehicles.
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="mailto:kirant23@yahoo.com" className="social-icon">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        {/* Car Brands & Technologies */}
        <div className="footer-section">
          <h3 className="footer-heading">Our Premium Brands</h3>
          <ul className="footer-list">
            <li>Mercedes-Benz</li>
            <li>BMW</li>
            <li>Audi</li>
            <li>Volkswagen</li>
            <li>Toyota</li>
            <li>Ford</li>
            <li>Porsche</li>
            <li>Lexus</li>
          </ul>
        </div>

        {/* Services Offered */}
        <div className="footer-section">
          <h3 className="footer-heading">Our Services</h3>
          <ul className="footer-list">
            <li>Luxury Car Sales</li>
            <li>Certified Pre-Owned Vehicles</li>
            <li>Financing & Leasing Options</li>
            <li>Vehicle Insurance Assistance</li>
            <li>Car Servicing & Maintenance</li>
            <li>Test Drive Bookings</li>
            <li>Trade-In & Exchange Offers</li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-list">
            <li><i className="fas fa-envelope"></i> xyz@gmail.com</li>
            <li><i className="fas fa-phone"></i> +91 9696969696</li>
            <li><i className="fab fa-whatsapp"></i> +91 99999 88888</li>
            <li><i className="fas fa-map-marker-alt"></i> Mumbai, Maharashtra, India</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
