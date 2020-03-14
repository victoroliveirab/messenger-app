import React from "react";
import Avatar from "../Avatar/avatar.component";
import { connect } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import "./topbar.styles.css";

class TopBar extends React.Component {
    //TODO divide topbar between topbar left and topbar right

    render() {
        return (
            <div className="top-bar">
                <div className="top-bar__main">
                    <div>
                        <Avatar className="top-bar__avatar" rounded={true} />
                    </div>
                    <div className="top-bar__other-icons">
                        <PlayCircleFilledIcon />
                        <ChatBubbleIcon />
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="top-bar__others">
                    <MoreVertIcon />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ currentUser: state.user.currentUser });

export default connect(mapStateToProps)(TopBar);
