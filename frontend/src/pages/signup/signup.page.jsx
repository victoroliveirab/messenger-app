import React from "react";
import SignUpForm from "../../components/SignUpForm/signupform.component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SignUpPage = ({ loggedIn }) => {
    if (loggedIn || sessionStorage.getItem("pitangAuth")) {
        return <Redirect to="/" />;
    }
    return <SignUpForm />;
};

const mapStateToProps = state => ({
    loggedIn: state.user.token
});

export default connect(mapStateToProps)(SignUpPage);
