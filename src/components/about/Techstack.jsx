import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri';
import { useGlitch } from 'react-powerglitch';

import 'react-multi-carousel/lib/styles.css';

import './techstack.css';
import Cmeter from "./Cmeter";

function Techstack() {
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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
  const items = [
    { maxCount: 70, dashoffset: 142, duration: 35, name: 'C/C++', index: 0 },
    { maxCount: 85, dashoffset: 71, duration: 30, name: 'JAVA', index: 1 },
    { maxCount: 50, dashoffset: 236, duration: 45, name: 'Web Programming', index: 2 },
    { maxCount: 30, dashoffset: 330, duration: 85, name: 'PYTHON', index: 3 },
    { maxCount: 75, dashoffset: 118, duration: 32, name: 'BASH', index: 4 },
  ];

  const CustomArrowPrev = ({ onClick }) => (
    <button onClick={onClick} aria-label="Go to previous slide" className="button-carousel-left">
      <RiArrowLeftSLine className="icon-carousel"/>
    </button>
  );
  
  const CustomArrowNext = ({ onClick }) => (
    <button onClick={onClick} aria-label="Go to next slide" className="button-carousel-right">
      <RiArrowRightSLine className="icon-carousel" />
    </button>
  );

  const [key, setKey] = useState(0);

  return (
    <section className="skill" id="skills">
        <Container>
            <Row style={{paddingTop: "30px"}}>
                <Col md={12}>
                  <h1 className="header-name">
                   PROFESSIONAL <strong className="color-10" ref={glitch.ref}>SKILLSET </strong>
                  </h1>
                  <div className="skill-bx wow zoomIn">
                        <Carousel 
                          responsive={responsive} 
                          infinite={true} 
                          afterChange={() => {
                            setKey(prevKey => prevKey + 1);
                          }}
                          customLeftArrow={<CustomArrowPrev />}
                          customRightArrow={<CustomArrowNext />}
                          className="skill-slider">
                        { items.map((item) => (
                            <div className="item" key={item.index}>
                              <Cmeter key={key} maxCount={item.maxCount} dashoffset={item.dashoffset} duration={item.duration} />
                              <h5>{item.name}</h5>
                            </div>
                        )) }
                        </Carousel>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  );
}

export default Techstack;
