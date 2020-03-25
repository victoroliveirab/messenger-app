import React from "react";
import Avatar from "../Avatar/avatar.component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisV,
    faCommentAlt,
    faCircleNotch,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/user/user.actions";

import "./topbar.style.css";

const TopBar = props => {
    //TODO divide topbar between topbar left and topbar right
    switch (props.path) {
        case "/profile":
            return (
                <div className="top-bar-return">
                    <Link to="/">
                        <button type="button" className="btn" href="/">
                            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                        </button>
                    </Link>
                </div>
            );
        default:
            return (
                <div className="top-bar">
                    <div className="top-bar__main">
                        <div>
                            <Link to="/profile">
                                <Avatar
                                    className="top-bar__avatar"
                                    rounded={true}
                                    username={props.user.username}
                                />
                            </Link>
                        </div>
                        <div className="top-bar__other-icons">
                            <Link to="/stories">
                                <button
                                    type="button"
                                    className="top-bar__button"
                                >
                                    <FontAwesomeIcon
                                        icon={faCircleNotch}
                                        size="2x"
                                    />
                                </button>
                            </Link>
                            <Link
                                to={
                                    props.path === "/message" ? "/" : "/message"
                                }
                            >
                                <button
                                    type="button"
                                    className="top-bar__button"
                                >
                                    <FontAwesomeIcon
                                        icon={faCommentAlt}
                                        size="2x"
                                    />
                                </button>
                            </Link>

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
                                    <Link to="/profile">
                                        <button className="dropdown-item">
                                            Profile
                                        </button>
                                    </Link>
                                    <Link to="/help">
                                        <button className="dropdown-item">
                                            Help
                                        </button>
                                    </Link>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => props.logout()}
                                    >
                                        Sign Out
                                    </button>
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
                                <Link to="/profile">
                                    <button className="dropdown-item">
                                        Profile
                                    </button>
                                </Link>
                                <Link to="/help">
                                    <button className="dropdown-item">
                                        Help
                                    </button>
                                </Link>
                                <Link to="/logout">
                                    <button className="dropdown-item">
                                        Sign Out
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
};

const mapStateToProps = state => ({
    path: state.router.location.pathname,
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
