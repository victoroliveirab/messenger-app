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
import "../../utils/customscrollbar.css";

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
                    Authorization: this.props.token
                }
            });
            const contactList = sortObjectsByStringValue(
                response.data,
                "username"
            );
            this.props.setContactList(contactList);
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
                            Authorization: this.props.token
                        }
                    }
                );
                const lastMessage = response.data;
                if (lastMessage) chatList.push({ contact, lastMessage });
            }
            const chatListSortedByLastMessage = sortObjectsByTimeValue(
                chatList,
                "sendTime"
            );
            this.props.setChatList(chatListSortedByLastMessage);
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
                    <div className="contact-list-wrapper custom-scrollbar">
                        <div className="contact-list">
                            {this.props.contactList.map(contact => {
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
                    <div className="contact-list-wrapper custom-scrollbar">
                        <div className="contact-list">
                            {this.props.chatList.map((entry, i) => {
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
    token: state.user.token,
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
