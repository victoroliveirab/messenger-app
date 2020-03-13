import React from "react";
import LoginForm from "../../components/LoginForm/login.component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";

const LoginPage = ({ loggedIn, login }) => {
    if (loggedIn || sessionStorage.getItem("pitangAuth")) {
        if (!loggedIn) {
            const auth = sessionStorage.getItem("pitangAuth");
            const username = sessionStorage.getItem("pitangUsername");
            login({ auth, username });
        }
        return <Redirect to="/" />;
    }
    return <LoginForm />;
};

const mapStateToProps = state => ({
    loggedIn: state.user.auth
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
