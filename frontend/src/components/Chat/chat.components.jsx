import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Message from "../Message/message.components";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

import "./chat.styles.css";

const axios = require("axios");

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.messages = null;
        this.auth = this.props.auth;
        console.log("constructor");
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (!this.auth) {
            this.auth = sessionStorage.getItem("pitangAuth");
        }
        if (this.props.currentContact !== prevProps.currentContact) {
            this.setState({ loading: true });
            try {
                const response = await axios.get(
                    `/msg/${this.props.currentContact}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: this.auth
                        }
                    }
                );
                this.messages = this.showMessages(response.data);
                this.setState({ loading: false });
            } catch (err) {
                console.log(
                    `Error while fetching chat with ${this.props.currentContact}`
                );
                console.error(err);
            }
        }
    };

    showMessages = messages => (
        <div className="chat">
            {messages.map(message =>
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

    render() {
        if (this.props.currentContact === null) {
            return <p>Select a friend you'd like to chat with!!</p>;
        } else if (this.state.loading) {
            return `Fetching conversation with ${this.props.currentContact}`;
        } else if (this.messages.props.children.length === 0) {
            console.log(this.messages);
            return "None yet. sendone!";
        }
        return this.messages;
    }
}

const mapStateToProps = state => ({
    auth: state.user.auth,
    username: state.user.username,
    currentContact: state.contactList.contactSelected
});

export default connect(mapStateToProps)(Chat);
