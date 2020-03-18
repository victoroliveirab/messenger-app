import React, { Component } from "react";
import Message from "../Message/message.component";
import { connect } from "react-redux";

import "./chat.style.css";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    showMessages = () => {
        return (
            <div className="chat">
                {this.props.messages.map(message =>
                    message.sourceUsername === this.props.username ? (
                        <div className="message-container message-owner">
                            <Message key={message.id} {...message} />
                        </div>
                    ) : (
                        <div className="message-container message-other">
                            <Message key={message.id} {...message} />
                        </div>
                    )
                )}
            </div>
        );
    };

    render() {
        if (this.props.currentContact === null) {
            return (
                <div className="chat-no-contact-selected">
                    <h2>Hello, {this.props.username}!</h2>
                    <p>Select a friend you'd like to chat with!</p>
                </div>
            );
        } else if (this.props.currentContact && !this.props.messages) {
            return `Fetching conversation with ${this.props.currentContact}`;
        } else if (/* this.props.messages.children.length === 0 */ false) {
            return "None yet. sendone!";
        }
        return this.showMessages();
    }
}

const mapStateToProps = state => ({
    auth: state.user.auth,
    username: state.user.username,
    currentContact: state.contactList.contactSelected,
    messages: state.chat.messages
});

export default connect(mapStateToProps)(Chat);
