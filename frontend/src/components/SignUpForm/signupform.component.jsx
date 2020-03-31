import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "./logo.png";

import { dispatchPost } from "../../utils/request";

import "./signupform.style.css";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            birthday: "",
            password: ""
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        console.log("submit");
        console.log(this.state);
        const { name, username, email, password, passwordConfirm } = this.state;
        if (password !== passwordConfirm) {
            alert("Passwords dont match");
            return;
        }
        const birthday = this.state.birthday.replace(/\//g, "-");
        console.log(birthday);
        await dispatchPost("/signup", {
            name,
            username,
            password,
            email,
            birthday
        }).catch(err => console.error(err));
    };

    handleChange = event => {
        //TODO when leave email or username field, async a get from the server to see if
        // entry already in use!
        const { id, value } = event.target;
        console.log(id + ": " + value);
        this.setState({ [id]: value });
    };

    handleBirthday = date => this.setState({ birthday: date });

    render() {
        return (
            <div className="main-wrapper signup-wrapper">
                <div className="red-rectangle"></div>
                <div className="signup-form-container container-fluid">
                    <div className="form-img-wrapper">
                        <img src={logo} alt="" className="form-img" />
                    </div>
                    <div className="signup-form">
                        <div className="signup-form__header">
                            <Link to="/login">
                                <button
                                    type="button"
                                    className="btn signup-form__back"
                                >
                                    <FontAwesomeIcon
                                        icon={faArrowLeft}
                                        size="2x"
                                    />
                                </button>
                            </Link>
                            <h2 className="signup-form__title">Sign up</h2>
                        </div>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    onChange={this.handleChange}
                                />
                            </div>
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
                                <label className="form-label" htmlFor="email">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    onChange={this.handleChange}
                                    aria-describedby="emailHelp"
                                />
                                <small
                                    id="emailHelp"
                                    className="form-text text-muted"
                                >
                                    We'll never share your email with anyone
                                    else.
                                </small>
                            </div>
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    htmlFor="birthday"
                                >
                                    Birthday
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="birthday"
                                    onChange={this.handleChange}
                                    aria-describedby="birthdayHelp"
                                />
                                <small
                                    id="birthdayHelp"
                                    className="form-text text-muted"
                                >
                                    You have to be over 18 to use this app.
                                </small>
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
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    htmlFor="passwordConfirm"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordConfirm"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    onChange={this.handleChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleCheck1"
                                >
                                    Check me out
                                </label>
                            </div>
                            <button type="submit" className="btn form-submit">
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
