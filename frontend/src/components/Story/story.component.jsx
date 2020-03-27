import React from "react";
import { connect } from "react-redux";

import "./story.style.css";

const Story = props => {
    if (props.currentStory) {
    }
    return (
        <div className="story-container">
            <h2 className="story-title">Select a story to start</h2>
        </div>
    );
};

const mapStateToProps = state => ({
    currentStory: state.story.currentStory
});

export default connect(mapStateToProps)(Story);
