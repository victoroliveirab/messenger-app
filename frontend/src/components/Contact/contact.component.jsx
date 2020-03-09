import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { selectContact } from "../../redux/contactList/contactList.actions";
import { connect } from "react-redux";

import "./contact.styles.css";

const mapDispatchToProps = dispatch => ({
    selectContact: contactName => dispatch(selectContact(contactName))
});

const putDivider = index => {
    if (index === 0) return;
    return <Divider variant="inset" component="li" />;
};

const findContactName = target => {
    //TODO there is a bug that sometimes you click on a element but the selected is the first on the list
    const tag = target.tagName.toLowerCase();
    switch (tag) {
        case "span":
            return target.textContent;
        case "div":
            return target.parentNode.parentNode.getElementsByTagName("span")[0]
                .textContent;
        case "li":
            return target.children[1].getElementsByTagName("span")[0]
                .textContent;
        case "p":
            return target.parentNode.children[0].textContent;
        default:
            console.error("Error while selecting contact");
            return "";
    }
};

const Contact = props => {
    const { index, ...contact } = props;
    return (
        <React.Fragment>
            {putDivider(index)}
            <ListItem
                className="contact__item"
                alignItems="flex-start"
                onClick={event => {
                    const contactName = findContactName(event.target);
                    props.selectContact(contactName);
                }}
            >
                <ListItemAvatar>
                    <Avatar
                        alt={contact.name}
                        src="/static/images/avatar/1.jpg"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={contact.name}
                    secondary={<React.Fragment>{"lorem ipsum"}</React.Fragment>}
                />
            </ListItem>
        </React.Fragment>
    );
};

export default connect(null, mapDispatchToProps)(Contact);
