import React from 'react'
import { useForm, ValidationError } from '@formspree/react';
import { FaFileAlt } from 'react-icons/fa';
import { FaLinkedinIn } from "react-icons/fa";
import { Container, Row, Col} from "react-bootstrap";
import { useGlitch } from 'react-powerglitch';
import {
  AiFillGithub,
} from "react-icons/ai";

import './contactMe.css'
import contactlogo from './../../assets/imgs/contactme.png'

function ContactMe() {
  const glitch = useGlitch({
    "playMode": "always",
    "createContainers": true,
    "hideOverflow": false,
    "timing": {
      "duration": 2550
    },
    "glitchTimeSpan": {
      "start": 0.5,
      "end": 0.7
    },
    "shake": {
      "velocity": 20,
      "amplitudeX": 0.47,
      "amplitudeY": 0.24
    },
    "slice": {
      "count": 11,
      "velocity": 17,
      "minHeight": 0.05,
      "maxHeight": 0.2,
      "hueRotate": true
    },
    "pulse": false
  });
  const [state, handleSubmit] = useForm("xqkvjzak");

  if (state.succeeded) {
  return (
  <div className="contact_form">
    <div className="formulario">
      <h2 style={{color: "var(--color-10"}}>Your message sent succesfully</h2>
    </div>
  </div>
    );
  }

  return (
    <Container fluid className="section">
      <Row className="row-form" style={{flexDirection: "row", justifyContent: "space-evenly"}}>
        <Col md={6}>
         <div className="contact_form">
          <div className="formulario">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email
            </label>
            <input id="email" type="email" name="email" placeholder='Add email' />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
            <label htmlFor="subject">
              Subject
            </label>
            <input id="subject" type="text" name="subject" placeholder='Add Subject' />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
            <label htmlFor="message" className='message'>
              Message
            </label>
            <textarea id="message" name="message" placeholder='Write your message' /> 
            <ValidationError prefix="Message" field="message" errors={state.errors} />
            <button type='submit' className='glowing-btn'><span className='glitch layers' data-text="SUBMIT">SUBMIT</span></button>
          </form>
         </div>
        </div>
       </Col>
       <Col md={6} >
          <div style={{display: "flex", justifyContent: "start", alignContent: "start", flexDirection: "column", 	padding: "0px 90px 0px 90px" }}>
            <img src={contactlogo} alt='contactlogo' style={{height: '100%', width: '94%'}} ref={glitch.ref}/>
            <div className="docs" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <a href='/cv.pdf' type='button' target="_blank" style={{ color: "var(--color-10)", textDecoration: "none"}} rel="noopener noreferrer">
                <FaFileAlt style={{paddingBottom: "2px"}}/> <span style={{color: "white"}}>CV</span>
              </a>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
                <a
                href="https://github.com/iestero42"
                style={{ color: "var(--color-10)", textDecoration: "none"}}
                target="_blank" 
                rel="noopener noreferrer"
                >
                <span style={{color: "white"}}>GITHUB</span> <AiFillGithub style={{marginBottom: "7px"}} /> 
                </a>
                <a
                href="https://www.linkedin.com/in/israel-estero-agueda/"
                style={{ color: "var(--color-10)", textDecoration: "none"}}
                target="_blank" 
                rel="noopener noreferrer"
                >
                 <span style={{color: "white"}}>LINKEDIN</span> <FaLinkedinIn style={{marginBottom: "7px"}} /> 
                </a>
              </div>
            </div>
          </div>
       </Col>
      </Row>
    </Container>
  );
}

export default ContactMe