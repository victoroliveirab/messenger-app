import React from "react";

import "./sendmessagebar.styles.css";

const SendMessageBar = () => {
    return (
        <div className="sendMessageBar">
            <input
                type="text"
                required
                placeholder="Send a message"
                className="sendMessageBar__field"
            />
        </div>
    );
};

export default SendMessageBar;
