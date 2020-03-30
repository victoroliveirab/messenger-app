import React from "react";
import Avatar from "../Avatar/avatar.component";
import { connect } from "react-redux";
import { dispatchPost } from "../../utils/request";
import {
    setSelectedContact,
    unsetCreateNewStory,
    appendOwnStories
} from "../../redux/story/story.actions";

import "./storycreateform.style.css";

const colors = [
    {
        id: 1,
        background: "#54ADC1",
        whiteFont: true
    },
    {
        id: 2,
        background: "#C1802A",
        whiteFont: true
    },
    {
        id: 3,
        background: "#70C348",
        whiteFont: true
    },
    {
        id: 4,
        background: "linear-gradient(45deg, #115df4, #e26cdd)",
        whiteFont: true
    },
    {
        id: 5,
        background: "linear-gradient(45deg, #006AF3, #85F1BB)",
        whiteFont: true
    },
    {
        id: 6,
        background: "linear-gradient(45deg, #db0a5b, #87d37c)",
        whiteFont: false
    },
    {
        id: 7,
        background: "linear-gradient(180deg, #FEFEFE, #989898)",
        whiteFont: false
    }
];

class StoryCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        const randomBackground = Math.floor(Math.random() * colors.length);
        this.state = {
            value: "",
            rows: 1,
            backgroundConfig: colors[randomBackground]
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const request = {
            text: this.state.value,
            gradient: this.state.backgroundConfig.background,
            whiteFont: this.state.backgroundConfig.whiteFont
        };
        await dispatchPost("/story", request, this.props.token)
            .then(response => this.props.appendOwnStories(response.data))
            .catch(err => console.error(err));

        this.props.setSelectedContact(null);
        this.props.unsetCreateNewStory();
    };

    handleChange = event => {
        const rows = event.target.rows;
        event.target.rows = 1;
        const newRows = Math.floor(
            Math.max(1, ~~(event.target.scrollHeight / 24) / 2 + 1)
        );
        console.log(newRows);
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
                <div
                    className="story-background"
                    style={{
                        background: this.state.backgroundConfig.background
                    }}
                ></div>
                <div className="create-story__title">
                    <Avatar
                        username={this.props.user.username}
                        token={this.props.token}
                        rounded
                    />
                    <div className="story-title__info">
                        <h5
                            className={`story-title__owner ${
                                this.state.backgroundConfig.whiteFont
                                    ? "story-title__owner-whitefont"
                                    : null
                            }`}
                        >
                            {this.props.user.username}
                        </h5>
                        <h6
                            className={`story-timeago ${
                                this.state.backgroundConfig.whiteFont
                                    ? "story-timeago-whitefont"
                                    : null
                            }`}
                        >
                            now
                        </h6>
                    </div>
                </div>
                <form
                    noValidate
                    className="story-create-form"
                    onSubmit={this.handleSubmit}
                >
                    <textarea
                        maxLength="280"
                        className={`story-textarea ${
                            this.state.backgroundConfig.whiteFont
                                ? "story-textarea-whiteplaceholder"
                                : null
                        }`}
                        name="storyText"
                        rows={this.state.rows}
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Write Something!"
                        ref={this.textarea}
                    ></textarea>
                    <div className="story-gradient-options">
                        {colors.map(color => (
                            <label
                                key={color.id}
                                className="gradient-picker-container"
                            >
                                <input
                                    type="radio"
                                    name="picker"
                                    className="gradient-picker"
                                    defaultChecked={
                                        color.id ===
                                        this.state.backgroundConfig.id
                                    }
                                />
                                <span
                                    className="picker"
                                    id={`color-${color.id}`}
                                    style={{ background: color.background }}
                                    onClick={() =>
                                        this.setState({
                                            backgroundConfig: color
                                        })
                                    }
                                ></span>
                            </label>
                        ))}
                    </div>
                    <button type="submit" className="story-submit">
                        Post
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    setSelectedContact: contactName =>
        dispatch(setSelectedContact(contactName)),
    unsetCreateNewStory: () => dispatch(unsetCreateNewStory()),
    appendOwnStories: story => dispatch(appendOwnStories(story))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryCreateForm);
