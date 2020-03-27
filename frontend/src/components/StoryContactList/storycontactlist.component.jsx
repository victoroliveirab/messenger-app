import React, { Component } from "react";
import Contact from "../Contact/contact.component";
import { setContactList } from "../../redux/contactList/contactList.actions";
import { setStoryList } from "../../redux/story/story.actions";
import { connect } from "react-redux";

import {
    sortObjectsByTimeValue,
    sortObjectsByStringValue
} from "../../utils/sort";

import "../../utils/customscrollbar.css";

const axios = require("axios");

class StoryContactList extends Component {
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
        console.log(storiesList);
        this.setState({ loading: false });
    }

    render() {
        if (this.props.loading) {
            return "fetching...";
        }
        return "done...";
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
