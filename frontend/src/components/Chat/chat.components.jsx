import React, { Component } from "react";
import Message from "../Message/message.components";
import { connect } from "react-redux";

import "./chat.styles.css";

const axios = require("axios");

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.messages = props.messages;
        console.log(this.messages);
    }

    // componentDidUpdate = async (prevProps, prevState) => {
    //     if (!this.auth) {
    //         this.auth = sessionStorage.getItem("pitangAuth");
    //     }
    //     if (this.props.currentContact !== prevProps.currentContact) {
    //         this.setState({ loading: true });
    //         try {
    //             const response = await axios.get(
    //                 `/msg/${this.props.currentContact}`,
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: this.auth
    //                     }
    //                 }
    //             );
    //             this.messages = this.showMessages(response.data);
    //             this.setState({ loading: false });
    //         } catch (err) {
    //             console.log(
    //                 `Error while fetching chat with ${this.props.currentContact}`
    //             );
    //             console.error(err);
    //         }
    //     }
    // };

    showMessages = () => {
        console.log("this.props::");
        console.log(this.props);
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
            return <p>Select a friend you'd like to chat with!!</p>;
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
