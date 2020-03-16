import React from "react";
import Avatar from "../Avatar/avatar.component";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisV,
    faCommentAlt,
    faCircleNotch
} from "@fortawesome/free-solid-svg-icons";

import "./topbar.styles.css";

class TopBar extends React.Component {
    //TODO divide topbar between topbar left and topbar right

    render() {
        return (
            <div className="top-bar">
                <div className="top-bar__main">
                    <div>
                        <Avatar className="top-bar__avatar" rounded={true} />
                    </div>
                    <div className="top-bar__other-icons">
                        <FontAwesomeIcon icon={faCircleNotch} />
                        <FontAwesomeIcon icon={faCommentAlt} />
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </div>
                </div>
                <div className="top-bar__others">
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ currentUser: state.user.currentUser });

export default connect(mapStateToProps)(TopBar);
