import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import { connect } from "react-redux";

import "./sendmessagebar.styles.css";

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
        console.log(destination, message);
        try {
            const response = await axios.post(
                `/msg/${destination}`,
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
            console.log(response);
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

export default connect(mapStateToProps)(SendMessageBar);
