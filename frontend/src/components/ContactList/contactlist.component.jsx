import React, { Component } from "react";
import List from "@material-ui/core/List";
import Contact from "../Contact/contact.component";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
    setContactList,
    unsetLoading
} from "../../redux/contactList/contactList.actions";
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

    async fetchContactList() {
        try {
            const response = await axios.get("/users/contacts", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.auth
                }
            });
            this.props.setContactList(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    async contactsAndLastMessages() {
        const contactList = await Promise.all(
            this.props.contacts.map(async contact => {
                const lastMessage = await axios.get(
                    `/msg/${contact.username}/last`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: this.auth
                        }
                    }
                );
                return {
                    contact,
                    lastMessage
                };
            })
        );
        console.log("xxxx");
        this.props.setContactList(contactList);
        console.log(this.props.contacts);
    }

    async componentDidMount() {
        await this.fetchContactList();
        const lastMessages = [];
        for (let contact of this.props.contacts) {
            const response = await axios.get(`/msg/${contact.username}/last`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.auth
                }
            });
            lastMessages.push(response);
        }
        console.log(this.props.contacts.length);
        console.log(lastMessages.length);
        this.props.unsetLoading();
    }

    render() {
        if (this.props.loading) {
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
    contacts: state.contactList.contacts,
    loading: state.contactList.loading
});

const mapDispatchToProps = dispatch => ({
    setContactList: contacts => dispatch(setContactList(contacts)),
    unsetLoading: () => dispatch(unsetLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
