import React, { Component } from "react";
import List from "@material-ui/core/List";
import Contact from "../Contact/contact.component";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { setContactList } from "../../redux/contactList/contactList.actions";
import { connect } from "react-redux";

import "./contactlist.styles.css";

const axios = require("axios");

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.auth = props.auth;
        this.state = {
            loading: true
        };
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
            this.setState({ loading: false });
            this.props.setContactList(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.loading) {
            return "fetching...";
        }
        return (
            <div className="contact-list-wrapper">
                <div className="contact-list">
                    {this.props.contacts.map((contact, i) => (
                        <Contact key={i} index={i} {...contact} />
                    ))}
                    No more contacts for you!
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contacts: state.contactList.contacts
});

const mapDispatchToProps = dispatch => ({
    setContactList: contacts => dispatch(setContactList(contacts))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
