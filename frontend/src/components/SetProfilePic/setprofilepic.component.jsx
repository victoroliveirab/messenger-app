import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./setprofilepic.style.css";

const SetProfilePic = () => (
    <div className="set-profile-pic">
        <div className="set-profile-pic__outer-circle">
            <FontAwesomeIcon
                icon={faUser}
                size="10x"
                className="set-profile-pic__picture"
            />
        </div>
        <button type="button" className="set-profile-pic__button">
            Change Picture
        </button>
    </div>
);

export default SetProfilePic;
