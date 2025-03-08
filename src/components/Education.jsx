import React, { useState } from "react";
import OpashSoftware from '../images/blog/image.png';
import OSCARCareerPoint from '../images/blog/OSCARCareerPoint.png';
import Teleperformance from '../images/blog/Teleperformance.svg';
import RKDFUniversity from '../images/blog/RKDFUniversity.png';
import NMUUniversity from '../images/blog/NMUUniversity.png';
import RDMPHighSchool from '../images/blog/RDMPHighSchool.png';
import NMVHighSchool from '../images/blog/NMVHighSchool.png';

const projects = {
    "Company - Opash Software, Surat": {
        img: OpashSoftware ,
        description:
            "Software developers are the architects of the digital world, responsible for creating the applications and systems that power our everyday lives, and data structures, using these tools to craft innovative solutions to complex problems.",
        tags: ["#SoftwareDevelopment", "#Programming", "#Jan 2024 - July 2024"]
    },
    "Full-Stack Developer - Course": {
        img: OSCARCareerPoint,
        description:
            "Full-stack developers are versatile professionals who possess a comprehensive understanding of both front-end and back-end technologies in software development.",
        tags: ["#FullStack", "#OSCAR CAREER POINT", "#June 2022 - Feb 2023"]
    },
    "Company - Teleperformance, Vadodara": {
        img: Teleperformance,
        description:
            "Frontend developers are the creative minds behind the user interfaces of websites and applications, shaping the way users interact with digital products.",
        tags: ["#Frontend Developer", "#UserExperience", "#March 2021 - June 2022"]
    },
    "MCA - RKDF University": {
        img: RKDFUniversity,
        description:
            "A Master of Computer Applications (MCA) degree equips individuals with advanced knowledge and skills in the field of computer science and software development.",
        tags: ["#MCA", "#Master of Computer Applications (MCA)", "#June 2023 - Present"]
    },
    "BCA - NMU University": {
        img: NMUUniversity,
        description:
            "A Bachelor of Computer Applications (BCA) degree provides students with a strong foundation in computer science, software development, and information technology.",
        tags: ["#BCA", "#(BCA)", "#July 2019 - June 2022"]
    },
    "12th - RDMP High School": {
        img: RDMPHighSchool,
        description:
            "High school education forms the foundation for students' academic and personal growth, providing a diverse range of subjects and opportunities for learning.",
        tags: ["#12th", "#High School", "#July 2017 - June 2019"]
    },
    "10th - NMV Dhamane": {
        img: NMVHighSchool,
        description:
            "High school education forms the foundation for students' academic and personal growth, providing a diverse range of subjects and opportunities for learning.",
        tags: ["#10th", "#High School", "#July 2016"]
    }
};

const Education = () => {
    const [selectedProject, setSelectedProject] = useState(Object.keys(projects)[0]);

    return (
        <div className="containerr">
            <h1 className="title">Education & Experience</h1>

            <div className="containerrr">
                {/* Sidebar */}
                <div className="sidebar">
                    <ul>
                        {Object.keys(projects).map((project) => (
                            <li
                                key={project}
                                onClick={() => setSelectedProject(project)}
                                className={selectedProject === project ? "active" : ""}
                            >
                                {project}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    <div className="content-box">
                        <div className="info">
                            <div className="text">
                                <p>{projects[selectedProject].description}</p>
                                <div className="tags">
                                    {projects[selectedProject].tags.map((tag, index) => (
                                        <span key={index}>{tag}</span>
                                    ))}
                                </div>
                                <a href="/contact" className="btn">Book demo</a>
                            </div>
                            <img src={projects[selectedProject].img} alt={selectedProject} className="project-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Education;