import React from "react";
import Avatar from "../Avatar/avatar.component";
import { connect } from "react-redux";

import "./storycreateform.style.css";

class StoryCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            rows: 1
        };
    }

    handleChange = event => {
        const rows = event.target.rows;
        event.target.rows = 1;
        const newRows = ~~(event.target.scrollHeight / 24);
        if (newRows === rows) {
            event.target.rows = newRows;
        }
        this.setState({
            value: event.target.value,
            rows: newRows
        });
    };

    render() {
        return (
            <div className="create-story-container">
                <div className="new-story-background"></div>
                <div className="create-story__title">
                    <Avatar
                        username={this.props.user.username}
                        token={this.props.token}
                        rounded
                    />
                    <div className="carousel-title__info">
                        <h5 className="carousel-title__owner">
                            {this.props.user.username}
                        </h5>
                        <h6 className="carousel-title__time-ago">now</h6>
                    </div>
                </div>
                <form noValidate className="story-create-form">
                    <textarea
                        className="story-textarea"
                        name="storyText"
                        cols="40"
                        rows={this.state.rows}
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Write Something!"
                    ></textarea>
                    <div className="story-gradient-options">
                        <div className="gradient-option option-1"></div>
                        <div className="gradient-option option-2"></div>
                        <div className="gradient-option option-3"></div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    user: state.user.user
});

export default connect(mapStateToProps)(StoryCreateForm);
