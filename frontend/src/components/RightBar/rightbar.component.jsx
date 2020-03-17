import React from "react";
import Chat from "../Chat/chat.component";
import SendMessageBar from "../SendMessageBar/sendmessagebar.component";

import "./rightbar.style.css";

const rightBar = () => {
    return (
        <div className="rightbar">
            <Chat className="chat-container" />
            <SendMessageBar />
        </div>
    );
};

export default rightBar;
