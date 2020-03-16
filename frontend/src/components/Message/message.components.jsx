import React from "react";
import { connect } from "react-redux";
import { formatSendTime } from "../../utils/formatSendDate";

import "./message.styles.css";

const Message = ({ ...props }) => {
    return (
        <div className="message-bubble">
            <p className="message__text">{props.message}</p>
            <p className="message__timestamp">
                {formatSendTime(props.sendTime)}
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.user.username
});

export default connect(mapStateToProps)(Message);
