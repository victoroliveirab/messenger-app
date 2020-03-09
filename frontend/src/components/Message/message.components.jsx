import React, { Component } from "react";
import List from "@material-ui/core/List";
import Contact from "../Contact/contact.component";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import "./message.styles.css";

const axios = require("axios");

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.auth = props.auth;
        this.state = {
            contacts: [],
            contactsLength: 0,
            loading: true
        };
        console.log("constructor");
    }

    async componentDidMount() {
        console.log("fetchContactList");
        try {
            const response = await axios.get("/users/contacts", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.auth
                }
            });

            console.log(response);
            this.setState({ loading: false });
            this.setState({ contacts: response.data });
            this.setState({ contactsLength: response.data.length });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.loading) {
            return "fetching...";
        }
        return (
            <List className="contact-list">
                {this.state.contacts.map((contact, i) => (
                    <Contact key={i} index={i} {...contact} />
                ))}
                <ListItem>
                    <ListItemText className="list-end__text">
                        No more contacts for you!
                    </ListItemText>
                </ListItem>
            </List>
        );
    }
}

export default ContactList;
