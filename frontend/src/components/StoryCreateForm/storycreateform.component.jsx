import React from "react";
import Avatar from "../Avatar/avatar.component";
import { connect } from "react-redux";

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

// TODO make options as radio buttons

class StoryCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.background = React.createRef();
        this.textarea = React.createRef();
        this.state = {
            value: "",
            rows: 1
        };
    }

    changeColor = color => {
        this.background.current.style.background = color.background;
        if (color.whiteFont) {
            this.textarea.current.style.color = "#ffffff";
            this.textarea.current.classList.add(
                "story-textarea-whiteplaceholder"
            );
        } else {
            this.textarea.current.style.color = "#000000";
            this.textarea.current.classList.remove(
                "story-textarea-whiteplaceholder"
            );
        }
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
                    ref={this.background}
                    className="new-story-background"
                ></div>
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
                        cols="40"
                        maxLength="280"
                        className="story-textarea"
                        name="storyText"
                        rows={this.state.rows}
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Write Something!"
                        ref={this.textarea}
                    ></textarea>
                    <div className="story-gradient-options">
                        {colors.map(color => (
                            <div
                                key={color.id}
                                className={`gradient-option option-${color.id}`}
                                style={{ background: color.background }}
                                onClick={() => this.changeColor(color)}
                            ></div>
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

export default connect(mapStateToProps)(StoryCreateForm);
