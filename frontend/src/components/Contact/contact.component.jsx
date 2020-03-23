import React from "react";
import Avatar from "../Avatar/avatar.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
    setContact,
    setContactRef
} from "../../redux/contactList/contactList.actions";
import { setMessages } from "../../redux/chat/chat.actions";
import { formatSendDateAndTime } from "../../utils/formatSendDate";
import { connect } from "react-redux";

import "./contact.style.css";

const axios = require("axios");

const findContactName = target =>
    target.current.children[1].firstChild.textContent;

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

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.contact = props.contact;
        this.lastMessage = props.lastMessage;
        this.simplified = props.simplified;
    }

    render() {
        return (
            <div
                className="contact"
                onClick={async event => {
                    const contactName = findContactName(this.ref);
                    if (contactName) {
                        const messages = await fetchMessagesToContact(
                            this.props.auth,
                            contactName
                        );
                        this.props.setMessages(messages);
                        this.props.setContact(this.contact);
                        //todo - refactor this. This should not be responsibility of contact.
                        if (this.props.contactSelectedRef)
                            this.props.contactSelectedRef.classList.remove(
                                "contact__selected"
                            );
                        this.props.setContactRef(this.ref.current);
                        this.props.contactSelectedRef.classList.add(
                            "contact__selected"
                        );
                    }
                }}
                ref={this.ref}
            >
                <div className="contact__photo">
                    <Avatar
                        username={this.contact.username}
                        auth={this.props.auth}
                    />
                </div>
                <div className="contact__main">
                    <h4>{this.contact.username}</h4>
                    <div className="contact__message-wrapper">
                        {!this.simplified && (
                            <p className="contact__message-preview">
                                {this.lastMessage.message}
                            </p>
                        )}
                    </div>
                </div>
                {!this.simplified && (
                    <div className="contact__other">
                        <span className="contact__other-timestamp">
                            {formatSendDateAndTime(this.lastMessage.sendTime)}
                        </span>
                        <div className="others">
                            <FontAwesomeIcon icon={faCaretDown} size="2x" />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.user.auth,
    username: state.user.username,
    contactSelected: state.contactList.contactSelected,
    contactSelectedRef: state.contactList.contactSelectedRef
});

const mapDispatchToProps = dispatch => ({
    setContact: contactName => dispatch(setContact(contactName)),
    setContactRef: contact => dispatch(setContactRef(contact)),
    setMessages: messages => dispatch(setMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
