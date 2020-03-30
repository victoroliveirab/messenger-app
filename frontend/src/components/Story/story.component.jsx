import React from "react";
import { connect } from "react-redux";
import StoryDisplay from "../StoryDisplay/storydisplay.component";
import StoryCreateForm from "../StoryCreateForm/storycreateform.component";

import "./story.style.css";

const Story = props => {
    if (props.selectedContact) {
        let info;
        const stories =
            props.selectedContact === props.user.username
                ? props.ownStories
                : props.stories.find(
                      element =>
                          element.contact.username === props.selectedContact
                  ).stories;
        info = {
            stories,
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
    user: state.user.user,
    selectedContact: state.story.selectedContact,
    stories: state.story.stories,
    createNewStory: state.story.createNewStory,
    ownStories: state.story.ownStories
});

export default connect(mapStateToProps)(Story);
