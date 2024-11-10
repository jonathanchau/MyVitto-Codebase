import './Navbar.css';
import React, { useState, useEffect } from 'react';
import Vitto_Logo_Final from "../../../assets/Home-Pages/Vitto_Logo_Final.png"

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);
  const [click, setClick] = useState(false);

  const handleMenuClick = () => {
    setClick(!click);
  }

  // Checks if the navbar is scrolled down
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const displayNavbar = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > lastScrollY){
        setShow(false);
      } else{
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', displayNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', displayNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav className ={show ? "show" : "hide"}>
      <div className={isScrolled ? "topnav-scrolled" : "topnav"}>
        <div className="topnav-left-logo">
        <a href="/"><img src={Vitto_Logo_Final} alt="Logo" loading="lazy" /></a>
        </div>
        <div className={click ? "menu-icon-active" : "menu-icon"} onClick={handleMenuClick}>
          <span className={click ? "topLineSpin" : "topLine"}></span>
          <span className={click ? "middleLineSpin" : "middleLine"}></span>
          <span className={click ? "bottomLineSpin" : "bottomLine"}></span>
        </div>
      </div>
      <div className={click ? "nav-menu-active" : "nav-menu"}>
        <div className="topnav-left">
          <a href="/Contact-Us">Contact Us</a>
          {/* <a href="/Learn">Learn</a> */}
        </div>
        <div className="topnav-right">
          <a href="/Sign-Up">Sign Up</a>
          <a href="/Login" className="topnav-right">Login</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
