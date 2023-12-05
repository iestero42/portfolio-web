import React from "react";
import Typewriter from "typewriter-effect";

import './type.css';

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Software Engineer (in process)",
          "42 Student",
          "Web Developer (learning)"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
