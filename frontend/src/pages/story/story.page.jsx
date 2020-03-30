import React from "react";
import TopBar from "../../components/TopBar/topbar.component";
import StoryContactList from "../../components/StoryContactList/storycontactlist.component";
import Story from "../../components/Story/story.component";
import LoadingScreen from "../../components/LoadingScreen/loadingscreen.component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./story.style.css";

const StoryPage = props => {
    const [toHome, setToHome] = React.useState(false);
    React.useEffect(() => {
        const handleKey = event => {
            console.log(toHome);
            if (event.keyCode === 27) {
                console.log("ESC PRESSED");
                setToHome(true);
            }
        };
        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("keydown", handleKey);
        };
    }, [toHome]);

    if (!props.user) {
        return <LoadingScreen />;
    } else if (!props.token) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: "/" }
                }}
            />
        );
    } else if (toHome) {
        return (
            <Redirect
                to={{
                    pathname: "/",
                    state: { from: "/story" }
                }}
            />
        );
    }
    return (
        <div className="container-fluid">
            <div className="row no-gutters top-bar-container">
                <TopBar />
            </div>
            <div className="row no-gutters bottom-bar-full">
                <div className="col-2 full-height">
                    <StoryContactList />
                </div>
                <div className="col-10 full-height">
                    <Story />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    token: state.user.token,
    user: state.user.user,
    path: state.router.location.pathname,
    createNewStory: state.story.createNewStory
});

export default connect(mapStateToProps)(StoryPage);
