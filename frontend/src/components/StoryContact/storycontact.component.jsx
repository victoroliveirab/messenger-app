import React from "react";
import Avatar from "../Avatar/avatar.component";
import {
    setSelectedContact,
    setSelectedContactRef
} from "../../redux/story/story.actions";
import { connect } from "react-redux";

import "./storycontact.style.css";

const retrieveUsername = ref => ref.current.children[1].textContent;

class StoryContact extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.contact = props.contact;
        this.lastMessage = props.lastMessage;
        this.simplified = props.simplified;
    }

    handleClick = target => {
        const selectedContact = retrieveUsername(target);
        if (selectedContact !== this.props.selectedContact) {
            this.props.setSelectedContact(selectedContact);
            if (this.props.selectedContactRef) {
                this.props.selectedContactRef.classList.remove(
                    "contact__selected"
                );
            }
            this.props.setSelectedContactRef(this.ref.current);
            this.ref.current.classList.add("contact__selected");
        }
    };

    render() {
        return (
            <div
                className="story-contact"
                ref={this.ref}
                onClick={() => this.handleClick(this.ref)}
            >
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
    selectedContact: state.story.selectedContact,
    selectedContactRef: state.story.selectedContactRef
});

const mapDispatchToProps = dispatch => ({
    setSelectedContact: contactName =>
        dispatch(setSelectedContact(contactName)),
    setSelectedContactRef: contactRef =>
        dispatch(setSelectedContactRef(contactRef))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryContact);
