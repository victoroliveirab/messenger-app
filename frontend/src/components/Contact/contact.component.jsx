import React from "react";
import Avatar from "../Avatar/avatar.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { selectContact } from "../../redux/contactList/contactList.actions";
import { setMessages } from "../../redux/chat/chat.actions";
import { formatSendDateAndTime } from "../../utils/formatSendDate";
import { connect } from "react-redux";

import "./contact.style.css";

const axios = require("axios");

const mapDispatchToProps = dispatch => ({
    selectContact: contactName => dispatch(selectContact(contactName)),
    setMessages: messages => dispatch(setMessages(messages))
});

const findContactName = target => {
    const tag = target.tagName.toLowerCase();
    // for now, to select a contact, click on the title or the preview text
    switch (tag) {
        case "h4":
            return target.textContent;
        case "div":
            if (target.className === "contact__other") {
                return target.previousSibling.children[0].textContent;
            }
            return target.parentNode.querySelector(".contact__main").children[0]
                .textContent;
        case "span":
            return target.parentNode.previousSibling.children[0].textContent;
        case "p":
            return target.parentNode.previousSibling.textContent;
        case "path":
        case "svg":
            return;
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
    return messages;
};

const Contact = props => {
    const { contact, lastMessage, simplified } = props;
    return (
        <div
            className="contact"
            onClick={async event => {
                const contactName = findContactName(event.target);
                if (contactName) {
                    const messages = await fetchMessagesToContact(
                        props.auth,
                        contactName
                    );
                    props.setMessages(messages);
                    props.selectContact(contactName);
                }
            }}
        >
            <div className="contact__photo">
                <Avatar username={contact.username} auth={props.auth} />
            </div>
            <div className="contact__main">
                <h4>{contact.username}</h4>
                <div className="contact__message-wrapper">
                    {!simplified && (
                        <p className="contact__message-preview">
                            {lastMessage.message}
                        </p>
                    )}
                </div>
            </div>
            {!simplified && (
                <div className="contact__other">
                    <span className="contact__other-timestamp">
                        {formatSendDateAndTime(lastMessage.sendTime)}
                    </span>
                    <div className="others">
                        <FontAwesomeIcon icon={faCaretDown} size="2x" />
                    </div>
                </div>
            )}
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
