import React, { Component } from "react";
import Contact from "../Contact/contact.component";
import {
    setContactList,
    setChatList
} from "../../redux/contactList/contactList.actions";
import { setStoryList } from "../../redux/story/story.actions";
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
        console.log("componentDidMount");
        if (this.props.contactList.length === 0) {
            await this.fetchContactList();
        }
        if (this.props.path === "/" || this.props.contactList.length === 0) {
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
        } else if (this.props.path === "/stories") {
            console.log("here");
            await this.fetchContactList();
            const storiesList = [];
            for (let contact of this.props.contactList) {
                const response = await axios.get(`/story/${contact.username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: this.props.token
                    }
                });
                const stories = response.data;
                if (stories.length > 0) storiesList.push({ contact, stories });
            }
            this.props.setStoryList(storiesList);
        }
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return "fetching...";
        }
        switch (this.props.path) {
            case "/message":
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
    setStoryList: stories => dispatch(setStoryList(stories))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
