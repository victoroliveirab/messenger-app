import React, { Component } from "react";
import Contact from "../Contact/contact.component";
import {
    setContactList,
    unsetLoading
} from "../../redux/contactList/contactList.actions";
import { connect } from "react-redux";

import "./contactlist.style.css";

const axios = require("axios");

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    async fetchContactList() {
        try {
            const response = await axios.get("/users/contacts", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.props.auth
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
                            Authorization: this.props.auth
                        }
                    }
                );
                return {
                    contact,
                    lastMessage
                };
            })
        );
        this.props.setContactList(contactList);
    }

    async componentDidMount() {
        await this.fetchContactList();
        const contactList = [];
        for (let contact of this.props.contacts) {
            const response = await axios.get(`/msg/${contact.username}/last`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.props.auth
                }
            });
            const lastMessage = response.data;
            contactList.push({ contact, lastMessage });
        }
        this.props.setContactList(contactList);
        this.props.unsetLoading();
    }

    render() {
        if (this.props.loading) {
            return "fetching...";
        }
        return (
            <div className="contact-list-wrapper">
                <div className="contact-list">
                    {this.props.contacts.map((contact, i) => {
                        if (contact.lastMessage)
                            return (
                                <Contact
                                    key={i}
                                    index={i}
                                    contact={contact.contact}
                                    lastMessage={contact.lastMessage}
                                />
                            );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.user.auth,
    contacts: state.contactList.contacts,
    loading: state.contactList.loading
});

const mapDispatchToProps = dispatch => ({
    setContactList: contacts => dispatch(setContactList(contacts)),
    unsetLoading: () => dispatch(unsetLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
