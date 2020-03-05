import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

import "./contact.styles.css";

const putDivider = index => {
    if (index === 0) return;
    return <Divider variant="inset" component="li" />;
};

export default function contact(props) {
    console.log(props);
    return (
        <React.Fragment>
            {putDivider(props.index)}
            <ListItem className="test" alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        alt={props.name}
                        src="/static/images/avatar/1.jpg"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={props.name}
                    secondary={<React.Fragment>{"lorem ipsum"}</React.Fragment>}
                />
            </ListItem>
        </React.Fragment>
    );
}
