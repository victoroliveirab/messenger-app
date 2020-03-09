import React, { Component } from "react";
import List from "@material-ui/core/List";
import Message from "../Message/message.components";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
        console.log("constructor");
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.currentContact !== prevProps.currentContact) {
            this.setState({ loading: true });
            console.log(this.props.auth);
            try {
                // const response = await axios.get(
                //     `/msg/${this.props.currentContact}`,
                //     {
                //         headers: {
                //             "Content-Type": "application/json",
                //             Authorization: this.auth
                //         }
                //     }
                // );

                const response = await axios.get(`/msg/michael`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: this.props.auth
                    }
                });

                console.log(response);
                this.setState({ loading: false });
                this.messages = response.data;
            } catch (err) {
                console.error(err);
            }
            this.setState({ loading: false });
        }
    };

    render() {
        if (this.props.currentContact === null) {
            return "Select a friend you'd like to chat with!!";
        } else if (this.state.loading) {
            return `Fetching conversation with ${this.props.currentContact}`;
        }
        return "done";
    }
}

const mapStateToProps = state => ({
    auth: state.user.auth,
    currentContact: state.contactList.contactSelected
});

export default connect(mapStateToProps)(Chat);
