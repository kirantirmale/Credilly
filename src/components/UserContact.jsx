import React, { useState } from "react";
import WhatsApp from '../images/contact/WhatsappBlue.png';
import TelegramBlue from '../images/contact/TelegramBlue.png';
import BookMeetingBlue from '../images/contact/BookMeetingBlue.png';
import MailBlue from '../images/contact/MailBlue.png';
import pdf from '../pdf/KiranTirmale-Resume.pdf';

const UserContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
    nationalId: "",
    month: "",
    year: "",
    make: "",
    model: "",
    estimatedAmount: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      // Save form data to localStorage
      localStorage.setItem('userContactData', JSON.stringify(formData));

      // Simulate a successful submission response
      setTimeout(() => {
        setLoading(false);
        setResponseMessage("Thank you for contacting us! We will get back to you shortly.");
      }, 1000); // Simulate network request delay
    } catch (error) {
      setLoading(false);
      setResponseMessage("An error occurred, please try again.");
    }
  };

  const handleTermsChange = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  return (
    <section className="user-contact-section">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">Get Estimate</h2>
          <p className="form-description">Let’s create something extraordinary. Get an estimate today!</p>

          <div className="grid-container">
            {/* Name */}
            <input
              id="name"
              className="input-field"
              placeholder="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {/* Email */}
            <input
              id="email"
              className="input-field"
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {/* Phone */}
            <input
              id="phone"
              className="input-field"
              placeholder="Phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {/* Budget */}
            <select
              id="budget"
              className="select-field"
              value={formData.budget}
              onChange={handleChange}
              required
            >
              <option value="">Select Budget</option>
              <option value="$100 - $1000">$100 - $1000</option>
              <option value="$1000 - $5000">$1000 - $5000</option>
              <option value="$5000 - $10,000">$5000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
            </select>

            {/* National ID */}
            <input
              id="nationalId"
              className="input-field"
              placeholder="National ID / Iqama No"
              type="text"
              value={formData.nationalId}
              onChange={handleChange}
              required
            />
            {/* Month Dropdown */}
            <select
              id="month"
              className="select-field"
              value={formData.month}
              onChange={handleChange}
              required
            >
              <option value="">Month</option>
              {/* You can replace this with dynamic month values if necessary */}
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              {/* Add other months as needed */}
            </select>

            {/* Year Dropdown */}
            <select
              id="year"
              className="select-field"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              {/* Add other years as needed */}
            </select>

            {/* Make */}
            <input
              id="make"
              className="input-field"
              placeholder="Make"
              type="text"
              value={formData.make}
              onChange={handleChange}
              required
            />

            {/* Model Dropdown */}
            <select
              id="model"
              className="select-field"
              value={formData.model}
              onChange={handleChange}
              required
            >
              <option value="">Model</option>
              <option value="Model1">Model1</option>
              <option value="Model2">Model2</option>
              <option value="Model3">Model3</option>
              {/* Add other models as needed */}
            </select>

            {/* Estimated Amount */}
            <select
              id="estimatedAmount"
              className="select-field"
              value={formData.estimatedAmount}
              onChange={handleChange}
              required
            >
              <option value="">Estimated Amount</option>
              <option value="$100 - $1000">$100 - $1000</option>
              <option value="$1000 - $5000">$1000 - $5000</option>
              <option value="$5000 - $10,000">$5000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
            </select>
          </div>

          {/* Message */}
          <textarea
            id="message"
            className="textarea-field"
            placeholder="Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          {/* Terms and Conditions */}
          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={isTermsAccepted}
              onChange={handleTermsChange}
            />
            <label htmlFor="terms">I accept the terms and conditions</label>
          </div>

          {/* Submit Button */}
          <div className="submit-btn">
            <button type="submit" disabled={loading || !isTermsAccepted}>
              {loading ? "Sending..." : "Here We Go!"}
            </button>
          </div>

          {/* Response Message */}
          {responseMessage && <p className="response-message">{responseMessage}</p>}
        </form>
      </div>

      <div className="contact-info">
        {/* WhatsApp */}
        <a href="https://wa.me/919607128284" target="_blank" rel="noopener noreferrer" className="contact-item">
          <img alt="WhatsApp" src={WhatsApp} />
          <div className="contact-text">
            <h3>WhatsApp Us</h3>
            <p>+91 9607128284</p>
          </div>
        </a>

        {/* Telegram */}
        <a href="https://t.me/me_kirannn" target="_blank" rel="noopener noreferrer" className="contact-item">
          <img alt="Telegram" src={TelegramBlue} />
          <div className="contact-text">
            <h3>Telegram Us</h3>
            <p>@me_kirannn</p>
          </div>
        </a>

        {/* Download CV */}
        <a href={pdf} download="Kiran_Tirmale_CV.pdf" className="contact-item" target="_blank" rel="noopener noreferrer">
          <img alt="BookMeeting" src={BookMeetingBlue} />
          <div className="contact-text">
            <h3>Download CV Now</h3>
            <p>Mern Stack Developer</p>
          </div>
        </a>

        {/* Email */}
        <a href="mailto:kirantirmale2362001@gmail.com" className="contact-item">
          <img alt="Mail" src={MailBlue} />
          <div className="contact-text">
            <h3>Drop an Email</h3>
            <p>kirantirmale2362001@gmail.com</p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default UserContact;
