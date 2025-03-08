import React, { useState } from "react";
import Golf6 from "../images/cars-big/golf6.jpg";
import AudiA1 from "../images/cars-big/audia1.jpg";
import Toyota from "../images/cars-big/toyotacamry.jpg";
import Bmw320 from "../images/cars-big/bmw320.jpg";
import Benz from "../images/cars-big/benz.jpg";
import Passat from "../images/cars-big/passatcc.jpg";
const IdeationServices = () => {
  const [selectedService, setSelectedService] = useState("MERN Stack Development");

  const services = [
    {
      id: "01",
      title: "Golf6",
      icon: "🔍",
      image: Golf6, // Add the image path here
      description: "We specialize in full-stack development using MongoDB, Express.js, React.js, and Node.js to build scalable and high-performance applications."
    },
    {
      id: "02",
      title: "AudiA1",
      icon: "💡",
      image: AudiA1, // Add the image path here
      description: "We create secure and efficient RESTful APIs using Node.js and Express, ensuring seamless data communication for your applications."
    },
    {
      id: "03",
      title: "Toyota",
      icon: "🎯",
      image: Toyota, // Add the image path here
      description: "Implement robust authentication strategies with JWT, OAuth, and Firebase, ensuring secure user access and role-based authorization."
    },
    {
      id: "04",
      title: "Bmw320",
      icon: "🎨",
      image: Bmw320, // Add the image path here
      description: "Efficient MongoDB database structuring, indexing, and optimization to enhance performance and ensure data consistency."
    },
    {
      id: "05",
      title: "Benz",
      icon: "📱",
      image: Benz, // Add the image path here
      description: "Deploy MERN applications on cloud platforms like AWS, Vercel, or Heroku, integrating CI/CD pipelines for automation."
    }
  ];

  return (
    <div className="service">
      <h1 className="title">MERN Stack Development Services We Offer</h1>
      <p className="description">
        As a full-stack development team, we provide cutting-edge MERN stack solutions, ensuring high-quality web and mobile applications tailored to your business needs.
      </p>
      <div className="service-container">
        <div className="service-list">
          {services.map((service) => (
            <React.Fragment key={service.id}>
              <button
                className={`service-button ${
                  selectedService === service.title ? "active" : ""
                }`}
                onClick={() => setSelectedService(service.title)}
              >
                {service.id}. {service.title}
              </button>
              <hr className="divider" />
            </React.Fragment>
          ))}
        </div>
        <div className="service-details">
          {services
            .filter((service) => service.title === selectedService)
            .map((service) => (
              <div key={service.id}>
                <div className="service-header">
                  {/* <span className="service-icon">{service.icon}</span>
                  <h2 className="service-title">{service.title}</h2> */}
                </div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-image" // Add a class for styling the image
                />
                {/* <p className="service-description">{service.description}</p> */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default IdeationServices;
