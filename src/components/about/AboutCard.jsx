import React from "react";
import Card from "react-bootstrap/Card";
import { useGlitch } from 'react-powerglitch';
import { IoLogoGameControllerB, IoIosBook } from 'react-icons/io';
import { FaMountain } from 'react-icons/fa';

import './aboutCard.css';

function AboutCard() {
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
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p className="about-description" style={{ textAlign: "start" }}>
            Hello World, My name is <strong className="color-10"> Israel Estero Agueda</strong> and I am
            from Madrid, Spain.
            <br />
            <br /> 
            I am a Third Year student pursuing B.S.
            in Software Engineering from Polytechnics University of Madrid. Also I am a student at <strong className="color-10">42 Madrid</strong> which is a program to develop
            certain skills such as problem solving, teamwork, and being self-taught.
            <br />
            <br />
            Additionally, I am enthusiastic about pretty much everything related to <strong className="color-10">Technology</strong> and 
            <strong className="color-10"> Science</strong>.
            <br />
            <br />
          </p>
          <h1 className="hoobies">H<strong className="color-10" ref={glitch.ref} >OO</strong>BIES</h1>
          <p className="about-hoobies" style={{ textAlign: "start", marginLeft: "1em" }}>
            <br />
            <IoLogoGameControllerB color="var(--color-10)"/> Videogames
            <br />
            <IoIosBook color="var(--color-10)"/> Read books
            <br />
            <FaMountain color="var(--color-10)"/> Hiking - Climbing
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
