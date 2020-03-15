import React from "react";
import Avatar from "../Avatar/avatar.component";
import { selectContact } from "../../redux/contactList/contactList.actions";
import { setMessages } from "../../redux/chat/chat.actions";
import { connect } from "react-redux";

import "./contact.styles.css";

const axios = require("axios");

const mapDispatchToProps = dispatch => ({
    selectContact: contactName => dispatch(selectContact(contactName)),
    setMessages: messages => dispatch(setMessages(messages))
});

const findContactName = target => {
    console.log(target);
    const tag = target.tagName.toLowerCase();
    // for now, to select a contact, click on the title or the preview text
    switch (tag) {
        case "h4":
            return target.textContent;
        case "div":
            return "";
        case "span":
            return target.children[1].getElementsByTagName("span")[0]
                .textContent;
        case "p":
            return target.parentNode.previousSibling.textContent;
        default:
            console.error("Error while selecting contact");
            return "";
    }
};

const fetchMessagesToContact = async (auth, contactName) => {
    let messages;
    try {
        const response = await axios.get(`/msg/${contactName}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: auth
            }
        });
        messages = response.data;
    } catch (err) {
        console.log(`Error while fetching chat with ${contactName}`);
        console.error(err);
    }
    console.log("messages here");
    console.log(messages);
    return messages;
};

const Contact = props => {
    const { contact, lastMessage } = props;
    return (
        <div
            className="contact"
            onClick={async event => {
                const contactName = findContactName(event.target);
                const messages = await fetchMessagesToContact(
                    props.auth,
                    contactName
                );
                props.setMessages(messages);
                props.selectContact(contactName);
            }}
        >
            <div className="contact__photo">
                <Avatar />
            </div>
            <div className="contact__main">
                <h4>{contact.username}</h4>
                <div className="contact__message-wrapper">
                    <p className="contact__message-preview">
                        {lastMessage.message}
                    </p>
                </div>
            </div>
            <div className="contact__other">
                <span className="contact__other-timestamp">06:25AM</span>
                <div className="others">\/</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.user.auth,
    username: state.user.username,
    currentContact: state.contactList.contactSelected,
    messages: state.chat.messages
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
