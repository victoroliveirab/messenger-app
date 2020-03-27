import React from "react";
import { connect } from "react-redux";

const Story = props => {
    if (props.currentStory) {
    }
    return "Select a story to start";
};

const mapStateToProps = state => ({
    currentStory: state.story.currentStory
});

export default connect(mapStateToProps)(Story);
