import React from "react";
import LoginForm from "../../components/LoginForm/login.component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../redux/user/user.actions";

import "../mainlayout.css";

const LoginPage = ({ loggedIn }) => {
    if (loggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <div className="main-wrapper">
            <div className="red-rectangle"></div>
            <LoginForm />
        </div>
    );
};

const mapStateToProps = state => ({
    loggedIn: state.user.token
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
