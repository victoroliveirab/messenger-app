import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";

import { appendMessage } from "../../redux/chat/chat.actions";
import { reorderCurrentToFirst } from "../../redux/contactList/contactList.actions";
import { connect } from "react-redux";

import "./sendmessagebar.style.css";

const axios = require("axios");

class SendMessageBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    handleChange = event => {
        this.setState({ message: event.target.value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { destination } = this.props;
        const message = this.state.message;
        try {
            const response = await axios.post(
                `/msg/${destination.username}`,
                {
                    message
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: this.props.auth
                    }
                }
            );
            this.props.appendMessage(response.data);
            this.setState({ message: "" });
            this.props.changeOrder();
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        return (
            <div>
                <form
                    noValidate
                    className="sendMessageBar"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        type="text"
                        required
                        placeholder="Send a message"
                        className="sendMessageBar__field"
                        onChange={this.handleChange}
                        value={this.state.message}
                    />
                    <div className="outer-circle">
                        <button
                            className="sendMessageBar__button"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faTelegramPlane} size="2x" />
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.user.auth,
    destination: state.contactList.contactSelected
});

const mapDispatchToProps = dispatch => ({
    appendMessage: message => dispatch(appendMessage(message)),
    changeOrder: () => dispatch(reorderCurrentToFirst())
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageBar);
