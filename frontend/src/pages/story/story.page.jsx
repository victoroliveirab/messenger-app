import React from "react";
import TopBar from "../../components/TopBar/topbar.component";
import StoryContactList from "../../components/StoryContactList/storycontactlist.component";
import StoryCreateForm from "../../components/StoryCreateForm/storycreateform.component";
import Story from "../../components/Story/story.component";
import LoadingScreen from "../../components/LoadingScreen/loadingscreen.component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./story.style.css";

const StoryPage = props => {
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
                    {props.createNewStory ? <StoryCreateForm /> : <Story />}
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
