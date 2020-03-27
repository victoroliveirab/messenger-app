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

import { dispatchGet } from "../../utils/request";

import "./contactlist.style.css";
import "../../utils/customscrollbar.css";

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    async fetchContactList() {
        let contactList;
        await dispatchGet("/contacts", this.props.token)
            .then(response => {
                contactList = sortObjectsByStringValue(
                    response.data,
                    "username"
                );

                this.props.setContactList(contactList);
            })
            .catch(err => console.error(err));
    }

    async componentDidMount() {
        console.log("componentDidMount");
        if (this.props.contactList.length === 0) {
            await this.fetchContactList();
        }
        if (this.props.path === "/") {
            const chatList = [];
            for (let contact of this.props.contactList) {
                await dispatchGet(
                    `/msg/${contact.username}/last`,
                    this.props.token
                )
                    .then(response => {
                        const lastMessage = response.data;
                        if (lastMessage)
                            chatList.push({ contact, lastMessage });
                    })
                    .catch(err => console.error(err));
            }
            const chatListSortedByLastMessage = sortObjectsByTimeValue(
                chatList,
                "sendTime"
            );
            this.props.setChatList(chatListSortedByLastMessage);
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
