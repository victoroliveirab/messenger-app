import React from "react";
import Avatar from "../Avatar/avatar.component";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
    setContact,
    setContactRef
} from "../../redux/contactList/contactList.actions";
import { setMessages } from "../../redux/chat/chat.actions";
import {
    toggleShow,
    setType,
    setOptions
} from "../../redux/modal/modal.actions";
import { formatSendDateAndTime } from "../../utils/formatSendDate";
import { connect } from "react-redux";

import { dispatchGet } from "../../utils/request";

import "./contact.style.css";

const findContactName = target =>
    target.current.children[1].firstChild.textContent;

const fetchMessagesToContact = async (token, contactName) => {
    let messages;
    await dispatchGet(`/msg/${contactName}`, token)
        .then(response => (messages = response.data))
        .catch(err => {
            console.log(`Error while fetching chat with ${contactName}`);
            console.error(err);
        });
    return messages;
};

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.contact = props.contact;
        this.simplified = props.simplified;
    }

    showModal = e => {
        this.setState({ show: !this.state.show });
        console.log(this.state);
    };

    render() {
        return (
            <>
                <div
                    className={`contact ${
                        this.props.contactSelected &&
                        this.props.contactSelected.username ===
                            this.contact.username
                            ? "contact__selected"
                            : ""
                    } `}
                    onClick={async event => {
                        if (
                            event.target.tagName === "svg" ||
                            event.target.tagName === "path" ||
                            event.target.classList.contains("dropdown-item")
                        ) {
                            return;
                        }
                        const contactName = findContactName(this.ref);
                        if (contactName) {
                            const messages = await fetchMessagesToContact(
                                this.props.token,
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
                            token={this.props.token}
                        />
                    </div>
                    <div className="contact__main">
                        <h4>{this.contact.username}</h4>
                        <div className="contact__message-wrapper">
                            {!this.simplified && (
                                <p className="contact__message-preview">
                                    {this.props.lastMessage.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {!this.simplified && (
                        <div className="contact__other">
                            <span className="contact__other-timestamp">
                                {formatSendDateAndTime(
                                    this.props.lastMessage.sendTime
                                )}
                            </span>
                            <div className="others">
                                <div className="dropdown">
                                    <button
                                        type="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        className="contact__other-options"
                                    >
                                        <FontAwesomeIcon
                                            icon={faAngleDown}
                                            size="2x"
                                        />
                                    </button>
                                    <div className="dropdown-menu">
                                        <button
                                            className="dropdown-item"
                                            onClick={() => {
                                                this.props.setType(
                                                    "DELETE_CONVERSATION"
                                                );
                                                this.props.setOptions({
                                                    contact: this.contact
                                                });
                                                this.props.toggleShow();
                                            }}
                                        >
                                            Delete Chat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    username: state.user.username,
    contactSelected: state.contactList.contactSelected,
    contactSelectedRef: state.contactList.contactSelectedRef
});

const mapDispatchToProps = dispatch => ({
    setContact: contactName => dispatch(setContact(contactName)),
    setContactRef: contact => dispatch(setContactRef(contact)),
    setMessages: messages => dispatch(setMessages(messages)),
    toggleShow: () => dispatch(toggleShow()),
    setType: type => dispatch(setType(type)),
    setOptions: options => dispatch(setOptions(options))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
