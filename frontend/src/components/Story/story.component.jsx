import React from "react";
import { connect } from "react-redux";
import StoryDisplay from "../StoryDisplay/storydisplay.component";
import StoryCreateForm from "../StoryCreateForm/storycreateform.component";

import "./story.style.css";

const Story = props => {
    if (props.selectedContact) {
        const current = props.stories.find(
            element => element.contact.username === props.selectedContact
        );
        const info = {
            stories: current.stories,
            selectedContact: props.selectedContact,
            token: props.token
        };
        return <StoryDisplay {...info} />;
    }
    if (props.createNewStory) {
        return <StoryCreateForm />;
    }
    return (
        <div className="story-welcome-container">
            <h2 className="story-welcome">Select a story to start!</h2>
        </div>
    );
};

const mapStateToProps = state => ({
    token: state.user.token,
    selectedContact: state.story.selectedContact,
    stories: state.story.stories,
    createNewStory: state.story.createNewStory
});

export default connect(mapStateToProps)(Story);
