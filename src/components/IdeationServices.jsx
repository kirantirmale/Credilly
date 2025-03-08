import React, { useState } from "react";
import Golf6 from "../images/cars-big/golf6.jpg";
import AudiA1 from "../images/cars-big/audia1.jpg";
import Toyota from "../images/cars-big/toyotacamry.jpg";
import Bmw320 from "../images/cars-big/bmw320.jpg";
import Benz from "../images/cars-big/benz.jpg";

const IdeationServices = () => {
  const services = [
    {
      id: "01",
      title: "Golf6",
      icon: "🔍",
      image: Golf6,
      description: "Volkswagen Golf 6 is known for its compact yet powerful design, featuring efficient fuel economy and a stylish exterior."
    },
    {
      id: "02",
      title: "Audi A1",
      icon: "💡",
      image: AudiA1,
      description: "The Audi A1 is a luxury hatchback with a sleek, sporty look and a tech-packed interior, offering a premium driving experience."
    },
    {
      id: "03",
      title: "Toyota Camry",
      icon: "🎯",
      image: Toyota,
      description: "Toyota Camry is a reliable sedan that provides excellent fuel efficiency, advanced safety features, and a comfortable ride."
    },
    {
      id: "04",
      title: "BMW 320",
      icon: "🎨",
      image: Bmw320,
      description: "BMW 320 is a sports sedan designed for performance enthusiasts, with dynamic handling and a refined interior."
    },
    {
      id: "05",
      title: "Mercedes-Benz",
      icon: "📱",
      image: Benz,
      description: "Mercedes-Benz offers luxury, power, and advanced technology, ensuring an elite driving experience with premium comfort."
    }
  ];

  // Set default selected service to "Golf6"
  const [selectedService, setSelectedService] = useState(services[0].title);

  return (
    <div className="service">
      <h1 className="title">Premium Car Models We Offer</h1>
      <p className="description">
        Explore our selection of high-end vehicles, each designed for ultimate performance, comfort, and cutting-edge technology.
      </p>

      <div className="service-container">
        {/* Sidebar: List of Cars */}
        <div className="service-list">
          {services.map((service) => (
            <React.Fragment key={service.id}>
              <button
                className={`service-button ${selectedService === service.title ? "active" : ""}`}
                onClick={() => setSelectedService(service.title)}
              >
                {service.id}. {service.title}
              </button>
              <hr className="divider" />
            </React.Fragment>
          ))}
        </div>

        {/* Car Details Section */}
        <div className="service-details">
          {services
            .filter((service) => service.title === selectedService)
            .map((service) => (
              <div key={service.id}>
                {/* <div className="service-header">
                  <span className="service-icon">{service.icon}</span>
                  <h2 className="service-title">{service.title}</h2>
                </div> */}
                <img src={service.image} alt={service.title} className="service-image" />
              
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default IdeationServices;
