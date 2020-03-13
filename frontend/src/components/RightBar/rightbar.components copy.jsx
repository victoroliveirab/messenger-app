import React from "react";
import Chat from "../Chat/chat.components";
import SendMessageBar from "../SendMessageBar/sendmessagebar.component";

import "./rightbar.styles.css";

const rightBar = () => {
    return (
        <div className="rightbar">
            <Chat className="chat-container" />
            {/* <SendMessageBar /> */}
        </div>
    );
};

export default rightBar;
