import React from "react";
import Avatar from "../Avatar/avatar.component";
import {
    setContact,
    setContactRef
} from "../../redux/contactList/contactList.actions";
import { setMessages } from "../../redux/chat/chat.actions";
import { connect } from "react-redux";

import "./storycontact.style.css";

class StoryContact extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.contact = props.contact;
        this.lastMessage = props.lastMessage;
        this.simplified = props.simplified;
    }

    render() {
        return (
            <div className="story-contact" ref={this.ref}>
                <div className="story-contact__photo">
                    <Avatar
                        username={this.contact.username}
                        token={this.props.token}
                        rounded
                    />
                </div>
                <div className="story-contact__main">
                    <h4>{this.contact.username}</h4>
                </div>
            </div>
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
    setMessages: messages => dispatch(setMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryContact);
