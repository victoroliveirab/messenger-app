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
    return (
        <div className={`message-align-to-${owner}`}>
            <p className={`message-body message-${owner}`}>{props.message}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.user.username
});

export default connect(mapStateToProps)(Message);
