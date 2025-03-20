import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';


const TopArrow = () => {
    const navigate = useNavigate();

    const [showTopIcon, setShowTopIcon] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = window.innerHeight * 0.1; // 10vh
            setShowTopIcon(window.scrollY > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>

            <div>
                {showTopIcon && (
                    <div className="top-icon" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <FaArrowUp size={15} />
                    </div>
                )}
            </div>
            <style>
                {`
    .top-icon {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgb(6, 255, 240);
      color: var(--bg-dark);
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0 2px 5px rgb(6, 255, 240);
      transition: transform 0.3s ease-in-out;
      z-index: 1000; /* Ensures it stays on top */
    }
    .top-icon:hover {
      transform: scale(1.1);
    }
  `}
            </style>
        </>
    )
}

export default TopArrow
