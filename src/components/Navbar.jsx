import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [nav, setNav] = useState(false);

  const openNav = () => setNav(!nav);

  return (
    <>
      <section className="main-sec">
        <div className="container">
          <nav className="nav">
            {/* Mobile Navbar */}
            <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
              <div onClick={openNav} className="mobile-navbar__close">
                <FiX />
              </div>
              <ul className="mobile-navbar__links">
                <li><NavLink onClick={openNav} to="/" end>Home</NavLink></li>
                <li><NavLink onClick={openNav} to="/services">Our Services</NavLink></li>
                <li><NavLink onClick={openNav} to="/blog">Blog</NavLink></li>
                <li><NavLink onClick={openNav} to="/contact">Contact</NavLink></li>
              </ul>
            </div>

            {/* Desktop Navbar */}
            <div className="navbar">
              <div className="navbar__img">
                <NavLink to="/">
                  <span className="kt">Credil<span className="t">Y</span></span>
                </NavLink>
              </div>
              <ul className="navbar__links">
                <li><NavLink to="/" end>Home</NavLink></li>
                <li><NavLink to="/services">Our Services</NavLink></li>
                <li><NavLink to="/blog">Blog</NavLink></li>
              </ul>
              <div className="navbar__buttons">
                <NavLink className="navbar__buttons__contact" to="/contact">
                  Contact
                </NavLink>
              </div>
              <div className="mobile-hamb" onClick={openNav}>
                <FiMenu />
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}

export default Navbar;
