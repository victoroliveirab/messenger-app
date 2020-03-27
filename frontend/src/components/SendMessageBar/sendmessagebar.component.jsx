import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";

import { appendMessage } from "../../redux/chat/chat.actions";
import { reorderCurrentToFirst } from "../../redux/contactList/contactList.actions";
import { connect } from "react-redux";

import { dispatchPost } from "../../utils/request";

import "./sendmessagebar.style.css";

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
        if (!message || !destination) return;
        await dispatchPost(
            `/msg/${destination.username}`,
            { message },
            this.props.token
        )
            .then(response => {
                this.props.appendMessage(response.data);
                this.setState({ message: "" });
                this.props.changeOrder();
            })
            .catch(err => console.log(err));
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
    token: state.user.token,
    destination: state.contactList.contactSelected
});

const mapDispatchToProps = dispatch => ({
    appendMessage: message => dispatch(appendMessage(message)),
    changeOrder: () => dispatch(reorderCurrentToFirst())
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageBar);
