import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    setToken,
    setUser,
    setRememberMe
} from "../../redux/user/user.actions";
import { addFlash } from "../../redux/flashList/flashList.actions";
import logo from "./logo.png";

import { dispatchGet, dispatchPost } from "../../utils/request";

import "./login.style.css";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rememberMe: false
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { username, password, rememberMe } = this.state;
        console.log(this.state);
        let token;
        await dispatchPost("/login", { username, password })
            .then(response => {
                token = response.headers.authorization;
                this.props.setToken(token);
            })
            .catch(() =>
                this.props.addFlash({
                    type: "danger",
                    message: "Wrong Username and/or password"
                })
            );
        await dispatchGet("/users", token)
            .then(response => this.props.setUser(response.data))
            .catch(err => {
                this.props.addFlash({
                    type: "danger",
                    message: "Unknown"
                });
            });
        this.props.setRememberMe(rememberMe);
    };

    handleChange = event => {
        const id = event.target.id;
        const value =
            id === "rememberMe" ? event.target.checked : event.target.value;
        this.setState({ [id]: value });
    };

    render() {
        return (
            <div className="signup-wrapper">
                <div className="signup-form-container container-fluid">
                    <div className="form-img-wrapper">
                        <img src={logo} alt="" className="form-img" />
                    </div>
                    <div className="signup-form">
                        <div className="signup-form__header">
                            <h2 className="signup-form__title">Sign In</h2>
                        </div>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                    onChange={this.handleChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="rememberMe"
                                >
                                    Remember me
                                </label>
                            </div>
                            <button type="submit" className="btn form-submit">
                                Sign In
                            </button>
                        </form>
                        <Link to="/signup">
                            <button type="button" className="btn form-submit">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addFlash: flash => dispatch(addFlash(flash)),
    setUser: user => dispatch(setUser(user)),
    setToken: token => dispatch(setToken(token)),
    setRememberMe: rememberMe => dispatch(setRememberMe(rememberMe))
});

export default connect(null, mapDispatchToProps)(LoginForm);
