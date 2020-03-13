import React from "react";
import SignUpForm from "../../components/SignUpForm/signupform.component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const signUpPage = ({ loggedIn }) => {
    if (loggedIn || sessionStorage.getItem("pitangAuth")) {
        return <Redirect to="/" />;
    }
    return <SignUpForm />;
};

const mapStateToProps = state => ({
    loggedIn: state.user.auth
});

export default connect(mapStateToProps)(signUpPage);
