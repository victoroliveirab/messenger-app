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
            this.auth = sessionStorage.getItem("auth");
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
        <Grid className="chat" container spacing={2}>
            {messages.map(message =>
                message.sourceUsername === this.props.username ? (
                    <Grid container xs={12}>
                        <Grid item xs={3} />
                        <Grid item xs={9}>
                            <Message key={message.id} {...message} />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container xs={12}>
                        <Grid item xs={9}>
                            <Message key={message.id} {...message} />
                        </Grid>
                        <Grid item xs={3} />
                    </Grid>
                )
            )}
        </Grid>
    );

    render() {
        if (this.props.currentContact === null) {
            return (
                <Container>
                    <Paper>Select a friend you'd like to chat with!!</Paper>
                </Container>
            );
        } else if (this.state.loading) {
            return `Fetching conversation with ${this.props.currentContact}`;
        }
        return <Container>{this.messages}</Container>;
    }
}

const mapStateToProps = state => ({
    auth: state.user.auth,
    username: state.user.username,
    currentContact: state.contactList.contactSelected
});

export default connect(mapStateToProps)(Chat);
