import React from "react";
import Avatar from "../Avatar/avatar.component";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisV,
    faCommentAlt,
    faCircleNotch,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

import "./topbar.style.css";

const TopBar = props => {
    //TODO divide topbar between topbar left and topbar right
    switch (props.path) {
        case "/profile":
            return (
                <div className="top-bar-return">
                    <a role="button" className="btn" href="/">
                        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                    </a>
                </div>
            );
        default:
            return (
                <div className="top-bar">
                    <div className="top-bar__main">
                        <div>
                            <a href="/profile">
                                <Avatar
                                    className="top-bar__avatar"
                                    rounded={true}
                                    username={props.username}
                                />
                            </a>
                        </div>
                        <div className="top-bar__other-icons">
                            <button type="button" className="top-bar__button">
                                <FontAwesomeIcon
                                    icon={faCircleNotch}
                                    size="2x"
                                />
                            </button>
                            <button type="button" className="top-bar__button">
                                <FontAwesomeIcon
                                    icon={faCommentAlt}
                                    size="2x"
                                />
                            </button>

                            <div className="dropdown">
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    className="top-bar__button"
                                >
                                    <FontAwesomeIcon
                                        icon={faEllipsisV}
                                        size="2x"
                                    />
                                </button>
                                <div className="dropdown-menu">
                                    <a
                                        className="dropdown-item"
                                        href="/profile"
                                    >
                                        Profile
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Help
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Sign Out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="top-bar__others">
                        <div className="dropleft">
                            <button
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                className="top-bar__button"
                            >
                                <FontAwesomeIcon icon={faEllipsisV} size="2x" />
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">
                                    Profile
                                </a>
                                <a className="dropdown-item" href="#">
                                    Help
                                </a>
                                <a className="dropdown-item" href="#">
                                    Sign Out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
};

const mapStateToProps = state => ({
    path: state.router.location.pathname,
    username: state.user.username
});

export default connect(mapStateToProps)(TopBar);
