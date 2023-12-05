import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useGlitch } from 'react-powerglitch';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiFillPhone, 
} from "react-icons/ai";

import './navbar.css';
import logo from "../../assets/imgs/42_logo.svg";


function NavBar() {
  const glitch = useGlitch({
    "playMode": "always",
    "createContainers": true,
    "hideOverflow": false,
    "timing": {
      "duration": 3950
    },
    "glitchTimeSpan": {
      "start": 0.1,
      "end": 0.65
    },
    "shake": {
      "velocity": 8,
      "amplitudeX": 0.04,
      "amplitudeY": 0.55
    },
    "slice": {
      "count": 13,
      "velocity": 22,
      "minHeight": 0.07,
      "maxHeight": 0.17,
      "hueRotate": true
    },
    "pulse": false
  });
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
    <Navbar.Brand href="/" className="d-flex">
          
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto home" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <span 
                  ref={glitch.ref}
                >
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto others">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/Portfolio_Web/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/Portfolio_Web/42madrid"
                onClick={() => updateExpanded(false)}
              >
                <span 
                  ref={glitch.ref}
                >
                  <img src={logo} alt="logo" width={30}/> Madrid
                </span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/Portfolio_Web/contactMe"
                onClick={() => updateExpanded(false)}
              >
                <AiFillPhone style={{ marginBottom: "2px" }} /> Contact Me
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
