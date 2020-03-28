import React, { Component } from "react";
import Message from "../Message/message.component";
import { connect } from "react-redux";
import logo from "./logo.png";

import "./chat.style.css";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.ref = React.createRef();
    }

    showMessages = () => {
        return (
            <div ref={this.ref} className="chat custom-scrollbar">
                {this.props.messages.map(message =>
                    message.sourceUsername === this.props.user.username ? (
                        <div
                            key={message.id}
                            className="message-container message-owner"
                        >
                            <Message {...message} />
                        </div>
                    ) : (
                        <div
                            key={message.id}
                            className="message-container message-other"
                        >
                            <Message {...message} />
                        </div>
                    )
                )}
                <div className="chat-logo-wrapper">
                    <img src={logo} alt="" className="chat-logo" />
                </div>
            </div>
        );
    };

    componentDidUpdate(prevProps) {
        if (
            this.props.currentContact !== prevProps.currentContact ||
            this.props.messages.length !== prevProps.messages.length
        ) {
            if (this.ref.current) {
                console.log(this.ref);
                this.ref.current.scrollTop = 100000;
            }
        }
    }

    render() {
        if (this.props.currentContact === null) {
            return (
                <div className="chat-no-contact-selected">
                    <h2>Hello, {this.props.user.username}!</h2>
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
    token: state.user.token,
    user: state.user.user,
    currentContact: state.contactList.contactSelected,
    messages: state.chat.messages
});

export default connect(mapStateToProps)(Chat);
