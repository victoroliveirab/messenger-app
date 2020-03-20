import React, { Component } from "react";
import Contact from "../Contact/contact.component";
import {
    setContactList,
    unsetLoading
} from "../../redux/contactList/contactList.actions";
import { connect } from "react-redux";

import {
    sortObjectsByTimeValue,
    sortObjectsByStringValue
} from "../../utils/sort";

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
            const response = await axios.get("/contacts", {
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

    async componentDidMount() {
        if (this.props.path === "/" || this.props.contactList.length === 0) {
            await this.fetchContactList();
            const contactList = [];
            for (let contact of this.props.contactList) {
                const response = await axios.get(
                    `/msg/${contact.username}/last`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: this.props.auth
                        }
                    }
                );
                const lastMessage = response.data;
                contactList.push({ contact, lastMessage });
            }
            this.props.setContactList(contactList);
        }
        this.props.unsetLoading();
    }

    render() {
        if (this.props.loading) {
            return "fetching...";
        }
        switch (this.props.path) {
            case "/message":
                return (
                    <div className="contact-list-wrapper">
                        <div className="contact-list">
                            {sortObjectsByStringValue(
                                this.props.contactList.map(
                                    entry => entry.contact
                                ),
                                "username"
                            ).map(({ ...contact }) => {
                                return (
                                    <Contact
                                        key={contact.id}
                                        contact={contact}
                                        simplified
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="contact-list-wrapper">
                        <div className="contact-list">
                            {sortObjectsByTimeValue(
                                this.props.contactList.filter(
                                    entry => entry.lastMessage
                                ),
                                "sendTime"
                            ).map((entry, i) => {
                                return (
                                    <Contact
                                        key={i}
                                        index={i}
                                        contact={entry.contact}
                                        lastMessage={entry.lastMessage}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    auth: state.user.auth,
    contactList: state.contactList.contacts,
    loading: state.contactList.loading,
    path: state.router.location.pathname
});

const mapDispatchToProps = dispatch => ({
    setContactList: contacts => dispatch(setContactList(contacts)),
    unsetLoading: () => dispatch(unsetLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
