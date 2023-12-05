import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useGlitch } from 'react-powerglitch';
import Tilt from "react-parallax-tilt";

import Techstack from "./Techstack";
import photo from "./../../assets/imgs/photo_me.jpeg"
import Aboutcard from "./AboutCard";
import './about.css';


function About() {
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

  return (
    <Container fluid className="about-section">
      <div className="about-content">
        <Row style={{ justifyContent: "space-evenly", paddingLeft: "100px" }}>
          <Col
            md={5}
            style={{
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 className="header-name">
              GET<strong className="color-10"> <span ref={glitch.ref}>TO</span> </strong>KNOW <strong className="color-10" ref={glitch.ref}>ME</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={3}
            style={{ 
              
              display: "flex",
              justifyContent: "center",
              alignItems: "center", 
              overflow: "hidden", 
              paddingTop: "30px", 
              paddingBottom: "30px" }}
            
            className="about-img circular-image"
          >
            <Tilt>
              <img src={photo} alt="about" className="img-fluid rounded-circle" />
            </Tilt>
          </Col>
        </Row>
        <Techstack />
      </div>  
    </Container>
  );
}

export default About;
