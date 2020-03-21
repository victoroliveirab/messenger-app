import React, { Component } from "react";
import Contact from "../Contact/contact.component";
import {
    setContactList,
    setChatList,
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
            const chatList = [];
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
                if (lastMessage) chatList.push({ contact, lastMessage });
            }

            this.props.setChatList(chatList);
        }
        this.props.unsetLoading();
    }

    render() {
        if (this.props.loading) {
            return "fetching...";
        }
        switch (this.props.path) {
            case "/message":
                console.log(this.props.contactList);
                return (
                    <div className="contact-list-wrapper">
                        <div className="contact-list">
                            {sortObjectsByStringValue(
                                this.props.contactList,
                                "username"
                            ).map(contact => {
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
                                this.props.chatList,
                                "sendTime"
                            ).map((entry, i) => {
                                return (
                                    <Contact
                                        key={entry.contact.id}
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
    chatList: state.contactList.chats,
    loading: state.contactList.loading,
    path: state.router.location.pathname
});

const mapDispatchToProps = dispatch => ({
    setContactList: contacts => dispatch(setContactList(contacts)),
    setChatList: chats => dispatch(setChatList(chats)),
    unsetLoading: () => dispatch(unsetLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
