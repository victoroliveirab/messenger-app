import React from "react";
import SignUpForm from "../../components/SignUpForm/signupform.component";
import { Redirect } from "react-router-dom";

const signUpPage = () => {
    if (sessionStorage.getItem("auth")) {
        return <Redirect to="/" />;
    }
    return <SignUpForm />;
};

export default signUpPage;
