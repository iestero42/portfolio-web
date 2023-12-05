import React, { useState, useEffect} from "react";
import {
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import { useGlitch } from 'react-powerglitch';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Preloader, Navbar, Home, About, ScrollToTop, MatrixRainingCode, Madrid42, ContactMe, BootAnimation } from "./components";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);
  const location = useLocation();
  const [lastLocation, setLastLocation] = useState(location.pathname);
  const [glitched, setGlitched] = useState(true);
  const glitch_load = useGlitch({
    "playMode": "always",
    "createContainers": true,
    "hideOverflow": true,
    "timing": {
      "duration": 2950
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

  useEffect(() => {
    const shouldStartGlitch = Math.random() >= 0.85; // Genera un número aleatorio entre 0 y 1

    if (location.pathname !== lastLocation) {
      if (shouldStartGlitch) {
        glitch_load.startGlitch();
        setLastLocation(location.pathname);
      }
    }

    const timer = setTimeout(() => {
      glitch_load.stopGlitch();
      setGlitched(false);
    }, 1950);
    return () => clearTimeout(timer);
}, [glitched, location, lastLocation, glitch_load]);

  useEffect(() => {
    upadateLoad(true);
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <BootAnimation />
      <Preloader load={load} />
      <div className="backscreen">
        <MatrixRainingCode className="matrixRaining" />
        <div className="App" id={load ? "no-scroll" : "scroll"} ref={glitch_load.ref}>
          <Navbar />
          <ScrollToTop />
          <TransitionGroup>
            <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
            >
              <Routes location={location}>
                <Route path="/Portfolio_Web/" element={<Home />} />
                <Route path="/Portfolio_Web/about" element={<About />} />
                <Route path="/Portfolio_Web/42madrid" element={<Madrid42 />} />
                <Route path="/Portfolio_Web/contactMe" element={<ContactMe />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </>
  );
}

export default App;
