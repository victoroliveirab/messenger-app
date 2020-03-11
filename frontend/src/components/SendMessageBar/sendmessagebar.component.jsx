import React from "react";
import Input from "@material-ui/core/Input";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";

import "./sendmessagebar.styles.css";

const SendMessageBar = () => {
    return (
        <div className="sendMessageBar">
            <Input
                type="text"
                required
                placeholder="Send a message"
                variant="outlined"
                className="sendMessageBar__field"
                endAdornment={
                    <InputAdornment position="end">
                        <SendIcon />
                    </InputAdornment>
                }
            />
        </div>
    );
};

export default SendMessageBar;
