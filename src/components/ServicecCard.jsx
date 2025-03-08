import React from 'react';
import { FaDatabase, FaServer, FaReact, FaNodeJs, FaCode, FaJs, FaPaintBrush, FaCloud } from 'react-icons/fa'; 
import { RiTailwindCssFill } from "react-icons/ri";
import { SiExpress, SiMongodb, SiHtml5, SiCss3, SiMui, SiJquery, SiNextdotjs } from "react-icons/si"; 

const services = [
    {
        icon: <FaReact size={50} color="#61DBFB" />,
        title: 'React.js',
        description: 'A powerful frontend JavaScript library for building user interfaces.',
        link: '/reactjs'
    },
    {
        icon: <FaNodeJs size={50} color="#68A063" />,
        title: 'Node.js',
        description: 'A runtime for JavaScript to build scalable, high-performance applications.',
        link: '/nodejs'
    },
    {
        icon: <SiExpress size={50} color="#000000" />,
        title: 'Express.js',
        description: 'Fast, minimal backend framework for Node.js applications.',
        link: '/expressjs'
    },
    {
        icon: <SiMongodb size={50} color="#4DB33D" />,
        title: 'MongoDB',
        description: 'A NoSQL database for flexible, scalable, and high-performance applications.',
        link: '/mongodb'
    },
    {
        icon: <FaJs size={50} color="#F7DF1E" />,
        title: 'JavaScript (ES6+)',
        description: 'Modern JavaScript features for better development efficiency.',
        link: '/javascript'
    },
    {
        icon: <SiHtml5 size={50} color="#E34F26" />,
        title: 'HTML5',
        description: 'The latest version of the standard markup language for web pages.',
        link: '/html5'
    },
    {
        icon: <SiCss3 size={50} color="#1572B6" />,
        title: 'CSS3',
        description: 'Modern styling capabilities for responsive and beautiful web designs.',
        link: '/css3'
    },
    {
        icon: <FaCloud size={50} color="#FF6F00" />, 
        title: 'REST APIs',
        description: 'Design and develop scalable and efficient RESTful APIs.',
        link: '/rest-api'
    },
    {
        icon: <FaPaintBrush size={50} color="#FF4081" />,
        title: 'UI/UX Design',
        description: 'Creating intuitive and aesthetically pleasing user experiences.',
        link: '/ui-ux-design'
    },
    {
        icon: <RiTailwindCssFill size={50} color="#38B2AC" />,
        title: 'Tailwind CSS',
        description: 'A utility-first CSS framework for rapid UI development.',
        link: '/tailwindcss'
    },
    {
        icon: <SiMui size={50} color="#007FFF" />,
        title: 'Material-UI (MUI)',
        description: 'A popular React UI framework for creating modern, responsive designs.',
        link: '/mui'
    },
    {
        icon: <SiJquery size={50} color="#0769AD" />,
        title: 'jQuery',
        description: 'A fast, lightweight JavaScript library for simplifying DOM manipulation.',
        link: '/jquery'
    },
    // {
    //     icon: <SiNextdotjs size={50} color="#000000" />,
    //     title: 'Next.js',
    //     description: 'A React framework for server-side rendering and static site generation.',
    //     link: '/nextjs'
    // }
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
