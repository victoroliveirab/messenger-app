import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import "./topbar.styles.css";

class TopBar extends React.Component {
    initials() {
        //console.log(props);
    }

    render() {
        return (
            <div className="top-bar">
                {/* <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <Avatar></Avatar>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <IconButton
                            aria-label="display more actions"
                            edge="end"
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar> */}
                <div className="top-bar__main">
                    <div>
                        <Avatar className="top-bar__avatar">VO</Avatar>
                    </div>
                    <div className="top-bar__other-icons">
                        <PlayCircleFilledIcon />
                        <ChatBubbleIcon />
                        <MoreVertIcon />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ currentUser: state.user.currentUser });

export default connect(mapStateToProps)(TopBar);
