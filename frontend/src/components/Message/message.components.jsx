import React from "react";
import { connect } from "react-redux";

import "./message.styles.css";

const Message = ({ ...props }) => {
    return <p className="message">{props.message}</p>;
};

const mapStateToProps = state => ({
    user: state.user.username
});

export default connect(mapStateToProps)(Message);
