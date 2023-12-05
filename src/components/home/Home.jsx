import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useGlitch } from 'react-powerglitch';

import homeLogo from "../../assets/imgs/home.png";
import Type from "./Type";
import './home.css';

function Home() {
  const glitch = useGlitch({
    "playMode": "always",
    "createContainers": true,
    "hideOverflow": false,
    "timing": {
      "duration": 3950
    },
    "glitchTimeSpan": {
      "start": 0.1,
      "end": 0.75
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
    <Container fluid className="home-section" id="home">
        <Row style={{ justifyContent: "space-evenly", paddingLeft: "100px" }}>
          <Col md={4} className="home-header">
            <h1 style={{ paddingBottom: 15 }} className="heading">
                WELCOME { " " }
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> ISRAEL ESTERO AGUEDA </strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
          </Col>
          <Col md={5} style={{ paddingBottom: 20 }}>
            <div ref={glitch.ref}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }
                }
              />
            </div>
           </Col>
          </Row>
          <Row style={{ justifyContent: "center", paddingLeft: "200px", paddingRight: "200px", paddingTop: "100px" }}>
            <Col md={12} style={{ paddingBottom: 20 }}>
              <div className="description-col">
                <div className="box">
                  <h2 className="description">
                  Welcome to my <span className="main-name">Portfolio Website</span>, a special creation to delve into the capabilities of 
                  React and showcase my ability to embrace new challenges. 
                  I will continuously update my portfolio as I acquire new skills, allowing you to witness my ongoing development in Web Dev. 
                  Additionally, you can explore all the projects I've worked on in dedicated sections.  
                  </h2>
                </div>
              </div>
            </Col>
          </Row>
    </Container>
  );
}

export default Home;
