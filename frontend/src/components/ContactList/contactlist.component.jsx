import React, { Component } from "react";
import List from "@material-ui/core/List";
import Contact from "../Contact/contact.component";

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
            <List>
                {this.state.contacts.map((contact, i) => (
                    <Contact key={i} index={i} {...contact} />
                ))}
            </List>
        );
    }
}

export default ContactList;
