import React from 'react';
import { FaCar, FaOilCan, FaWrench, FaChargingStation, FaCarCrash, FaTools, FaGasPump, FaCarSide, FaShieldAlt } from 'react-icons/fa';

const services = [
    {
        icon: <FaCar size={50} color="#FF5733" />, 
        title: 'Car Sales',
        description: 'Find the best deals on new and used cars.',
        link: '/car-sales'
    },
    {
        icon: <FaOilCan size={50} color="#FFA500" />, 
        title: 'Oil Change',
        description: 'Keep your engine healthy with our oil change service.',
        link: '/oil-change'
    },
    {
        icon: <FaWrench size={50} color="#008080" />, 
        title: 'Car Repair',
        description: 'Reliable and affordable car repair services.',
        link: '/car-repair'
    },
    {
        icon: <FaChargingStation size={50} color="#00CED1" />, 
        title: 'EV Charging',
        description: 'Fast and convenient electric vehicle charging stations.',
        link: '/ev-charging'
    },
    {
        icon: <FaCarCrash size={50} color="#DC143C" />, 
        title: 'Accident Repair',
        description: 'Comprehensive accident and collision repair services.',
        link: '/accident-repair'
    },
    {
        icon: <FaTools size={50} color="#4682B4" />, 
        title: 'Car Maintenance',
        description: 'Routine maintenance to keep your car in top condition.',
        link: '/car-maintenance'
    },
    {
        icon: <FaGasPump size={50} color="#32CD32" />, 
        title: 'Fuel Services',
        description: 'Convenient refueling options for your vehicle.',
        link: '/fuel-services'
    },
    {
        icon: <FaCarSide size={50} color="#A52A2A" />, 
        title: 'Car Rentals',
        description: 'Affordable car rentals for all your travel needs.',
        link: '/car-rentals'
    },
    {
        icon: <FaShieldAlt size={50} color="#FFD700" />, 
        title: 'Car Insurance',
        description: 'Protect your vehicle with our comprehensive insurance plans.',
        link: '/car-insurance'
    }
];

const ServiceCard = () => {
    return (
        <section className="services-container">
            <header>
                <h1 className="service-titlee">Our Services</h1>
                <p className='ser-p'>End-to-end development solutions using modern web technologies.</p>
            </header>
            <div className="services-grid">
                {services.map((service, index) => (
                    <article key={index} className="service-card">
                        <div className="card-header">
                            <div className="icon">{service.icon}</div>
                            <h2>{service.title}</h2>
                        </div>
                        <p>{service.description}</p>
                        <a href={service.link} target="_blank" rel="noopener noreferrer">Explore More</a>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default ServiceCard;