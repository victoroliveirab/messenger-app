import React from "react";
import LoginForm from "../../components/LoginForm/login.component";
import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    redirect = () => {
        console.log("called");
        this.setState({ redirect: true });
    };

    render() {
        if (this.state.redirect || sessionStorage.getItem("auth")) {
            console.log("here");
            return <Redirect to="/" />;
        }
        return <LoginForm redirectFn={this.redirect} />;
    }
}

export default LoginPage;
