import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { Modal, Box, Button, Typography } from "@mui/material";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  // Function to fetch data from localStorage
  const fetchUserData = () => {
    const storedData = localStorage.getItem("bookCarData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      setUserData(null);
    }
  };

  // Fetch data on component mount and periodically check for updates in localStorage
  useEffect(() => {
    fetchUserData(); // Initial fetch

    const interval = setInterval(() => {
      fetchUserData(); // Periodically update every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);
  const openNav = () => setNav(!nav);
  const handleOpen = () => {
    setOpen(true);
    setNav(false); // Close mobile navbar
  };
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("bookCarData");
    fetchUserData(); // Update state after removing data
    setOpen(false);
  };

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
                {/* Conditionally render profile circle or contact */}
                {userData && (
                  <li className="mobile-profile-circle">
                    <div className="profile-circle" onClick={handleOpen}>
                      <FiUser size={24} />
                    </div>
                  </li>
                )}
                <li><NavLink onClick={openNav} to="/" end>Home</NavLink></li>
                <li><NavLink onClick={openNav} to="/services">Our Services</NavLink></li>

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
              </ul>

              <div className="navbar__buttons">
                {userData ? (
                  <div className="profile-circle" onClick={handleOpen}>
                    <FiUser size={24} />
                  </div>
                ) : (
                  <NavLink className="navbar__buttons__contact" to="/contact">
                    Contact
                  </NavLink>
                )}
              </div>

              <div className="mobile-hamb" onClick={openNav}>
                <FiMenu />
              </div>
            </div>
          </nav>
        </div>
      </section>
      {/* MUI Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-modal-title"
        aria-describedby="user-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "90px",
            right: "50px",
            width: 300,
            color: "white",
            bgcolor: "black",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            border: "2px solid rgb(6, 255, 240)",
            
          }}
        >
          <Typography id="user-modal-title" variant="h6">
            User Details
          </Typography>
          {userData && (
            <>
              <Typography id="user-modal-description" sx={{ mt: 1 }}>
                <strong>National ID:</strong> {userData.nationalId}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Mobile Number:</strong> {userData.mobile}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{ mt: 2, width: "100%" }}
              >
                Logout
              </Button>
            </>
          )}
          {/* Close Icon with Border */}
          <div
            onClick={handleClose}
            className="modal-close-icon"
          >
            <FiX size={24} />
          </div>
        </Box>
      </Modal>

      {/* Profile Circle Styling */}
      <style>
        {`
    .profile-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgb(6 255 240);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: black;
    }

    /* Center profile circle in mobile navbar */
    .mobile-navbar__links {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .mobile-profile-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px; /* Adjust for spacing */
    }

    /* Modal Close Icon Style */
    .modal-close-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: transparent;
      padding: 5px;
      cursor: pointer;
      color: rgb(6 255 240);
    }

  `}
      </style>

    </>
  );
}

export default Navbar;
