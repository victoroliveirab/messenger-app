import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.component";
import "./App.css";
import loginPage from "./pages/login/login.page";
import signUpPage from "./pages/signup/signup.page";
import MessageApp from "./components/MessageApp/messageapp.component";

function App() {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={MessageApp} />
            <Route exact path="/login" component={loginPage} />
            <Route exact path="/signup" component={signUpPage} />
        </Switch>
    );
}

export default App;
