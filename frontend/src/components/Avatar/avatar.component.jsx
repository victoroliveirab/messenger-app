import React from "react";
import eric from "../../utils/eric.jpg";

import "./avatar.style.css";

const Avatar = ({ rounded }) => (
    <div className="img-wrapper">
        <img
            src={eric}
            alt=""
            className={`img ${rounded ? "img-rounded" : ""}`}
        />
    </div>
);

export default Avatar;
