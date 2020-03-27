import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.component";
import "./App.css";
import LoginPage from "./pages/login/login.page";
import SignUpPage from "./pages/signup/signup.page";
import StoryPage from "./pages/story/story.page";
import MainPage from "./pages/messageApp/messageapp.page";

function App() {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={MainPage} />
            <PrivateRoute exact path="/profile" component={MainPage} />
            <PrivateRoute exact path="/message" component={MainPage} />
            <PrivateRoute exact path="/stories" component={StoryPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
        </Switch>
    );
}

export default App;
