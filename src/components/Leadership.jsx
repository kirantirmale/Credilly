import React from "react";
import KiranImg from "../images/hero/kiran.jpg";
import UrmilaImg from "../images/hero/urmila.jpeg";

const Leadership = () => {
  return (
    <section className="leadership-section">
      {/* Heading */}
      <div className="leadership-heading">
        <h1>Leadership</h1>
      </div>

      {/* Leadership Grid */}
      <div className="leadership-grid">
        {/* Kiran - MERN Stack Developer */}
        <div className="leader-card">
          <div className="leader-info">
            <h2 className="leader-role">CEO</h2>
            <h3 className="leader-name">Kiran Tirmale</h3>
            <p className="leader-description">
              A passionate MERN Stack Developer with expertise in building
              scalable web applications using React.js, Node.js, Express.js, and
              MongoDB.
            </p>
          </div>
          <div className="leader-image">
            <img src={KiranImg} alt="Kiran Tirmale" />
          </div>
        </div>

        {/* Urmila - React Developer */}
        {/* <div className="leader-card">
          <div className="leader-info">
            <h2 className="leader-role">Developer</h2>
            <h3 className="leader-name">Urmila Chavan</h3>
            <p className="leader-description">
              A skilled React Developer specializing in modern front-end
              development, UI/UX design, and building interactive web
              applications.
            </p>
          </div>
          <div className="leader-image">
            <img src={UrmilaImg} alt="Urmila Chavan" />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Leadership;
