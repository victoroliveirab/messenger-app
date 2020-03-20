import React from "react";

import UpdateProfileForm from "../UpdateProfileForm/updateprofileform.component";
import Chat from "../Chat/chat.component";
import SendMessageBar from "../SendMessageBar/sendmessagebar.component";

import { connect } from "react-redux";
import "./rightbar.style.css";

const rightBar = props => {
    switch (props.path) {
        case "/profile":
            return <UpdateProfileForm />;
        default:
            return (
                <div className="rightbar-default">
                    <Chat className="chat-container" />
                    <SendMessageBar />
                </div>
            );
    }
};

const mapStateToProps = state => ({
    path: state.router.location.pathname
});

export default connect(mapStateToProps)(rightBar);
