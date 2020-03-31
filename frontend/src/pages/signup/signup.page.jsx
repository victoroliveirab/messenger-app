import React from "react";
import SignUpForm from "../../components/SignUpForm/signupform.component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SignUpPage = ({ loggedIn }) => {
    if (loggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <div className="main-wrapper">
            <div className="red-rectangle"></div>
            <SignUpForm />
        </div>
    );
};

const mapStateToProps = state => ({
    loggedIn: state.user.token
});

export default connect(mapStateToProps)(SignUpPage);
