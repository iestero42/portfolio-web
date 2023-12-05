import React from "react";

import './pre.css';

function Pre(props) {
  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
     <div className="window">
      <div className="logo">
        <p className="top">Israel</p>
        <p className="mid">Web<span>XP</span></p>
        <p className="bottom">Portfolio</p>
      </div>
      <div className="container-pre">
        <div className="box-1"></div>
        <div className="box-1"></div>
        <div className="box-1"></div>
      </div>
     </div>
    </div>
  );
}

export default Pre;
