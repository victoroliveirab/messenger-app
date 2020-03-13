import React, { Component } from "react";
import List from "@material-ui/core/List";
import Contact from "../Contact/contact.component";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";

import "./message.styles.css";

const axios = require("axios");

const Message = ({ ...props }) => {
    const owner = props.user === props.sourceUsername ? "user" : "contact";
    return <p className="message">{props.message}</p>;
};

const mapStateToProps = state => ({
    user: state.user.username
});

export default connect(mapStateToProps)(Message);
