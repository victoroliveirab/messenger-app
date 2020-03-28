import React from "react";
import { connect } from "react-redux";
import Avatar from "../Avatar/avatar.component";

import "./story.style.css";

const Story = props => {
    if (props.selectedContact) {
        const current = props.stories.find(
            element => element.contact.username === props.selectedContact
        );
        const currentStory = current.stories[0];
        const colors = currentStory.gradient.split(",");
        const divStyle = {
            background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`
        };
        //Todo: avoid second api call to a file we already have (avatar)
        return (
            <div className="story-container" style={divStyle}>
                <div className="story-owner">
                    <div className="story-owner__avatar">
                        <Avatar
                            username={props.selectedContact}
                            token={props.token}
                            rounded
                        />
                    </div>
                    <div className="story-owner__info">
                        <h5 className="story-owner__username">
                            {props.selectedContact}
                        </h5>
                        <h6 className="story-owner__time-ago">23 min ago</h6>
                    </div>
                </div>
                <h2 className="story-text">{currentStory.text}</h2>
            </div>
        );
    }
    return (
        <div className="story-container">
            <h2 className="story-title">Select a story to start</h2>
        </div>
    );
};

const mapStateToProps = state => ({
    token: state.user.token,
    selectedContact: state.story.selectedContact,
    stories: state.story.stories
});

export default connect(mapStateToProps)(Story);
