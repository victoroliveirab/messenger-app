import React, { Component } from "react";
import StoryContact from "../StoryContact/storycontact.component";
import { setContactList } from "../../redux/contactList/contactList.actions";
import { setStoryList } from "../../redux/story/story.actions";
import { connect } from "react-redux";

import "./storycontactlist.style.css";

import { sortObjectsByStringValue } from "../../utils/sort";

import { dispatchGet } from "../../utils/request";

import "../../utils/customscrollbar.css";

class StoryContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    async fetchContactList() {
        try {
            const response = await dispatchGet("/contacts", this.props.token);
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
        if (this.props.contactList.length === 0) {
            await this.fetchContactList();
        }
        await this.fetchContactList();
        const storiesList = [];
        for (let contact of this.props.contactList) {
            const response = await dispatchGet(
                `/story/${contact.username}`,
                this.props.token
            );
            const stories = response.data;
            if (stories.length > 0) storiesList.push({ contact, stories });
        }
        this.props.setStoryList(storiesList);
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return "fetching...";
        }
        return (
            <div className="story-contact-list-wrapper">
                <div className="story-contact-list">
                    {this.props.storiesList.map(entry => (
                        <StoryContact contact={entry.contact} />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    contactList: state.contactList.contacts,
    storiesList: state.story.stories,
    path: state.router.location.pathname
});

const mapDispatchToProps = dispatch => ({
    setContactList: contacts => dispatch(setContactList(contacts)),
    setStoryList: stories => dispatch(setStoryList(stories))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryContactList);
