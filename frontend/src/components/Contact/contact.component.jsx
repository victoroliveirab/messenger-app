import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { selectContact } from "../../redux/contactList/contactList.actions";
import { connect } from "react-redux";

import "./contact.styles.css";

const mapDispatchToProps = dispatch => ({
    selectContact: contactName => dispatch(selectContact(contactName))
});

const findContactName = target => {
    console.log(target);
    const tag = target.tagName.toLowerCase();
    // for now, to select a contact, click on the title or the preview text
    switch (tag) {
        case "h4":
            return target.textContent;
        case "div":
            return "";
        case "span":
            return target.children[1].getElementsByTagName("span")[0]
                .textContent;
        case "p":
            return target.parentNode.previousSibling.textContent;
        default:
            console.error("Error while selecting contact");
            return "";
    }
};

const Contact = props => {
    const { index, ...contact } = props;
    return (
        <div
            className="contact"
            onClick={event => {
                const contactName = findContactName(event.target);
                props.selectContact(contactName);
            }}
        >
            <div className="contact__photo">
                <Avatar>VO</Avatar>
            </div>
            <div className="contact__main">
                <h4>{contact.username}</h4>
                <div className="contact__message-wrapper">
                    <p className="contact__message-preview">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Veritatis, nisi atque. Aspernatur at, sed rem iusto
                        debitis rerum necessitatibus impedit! Fugit dolorum
                        dolor nam. Sint unde nemo quasi autem asperiores.
                    </p>
                </div>
            </div>
            <div className="contact__other">
                <span className="contact__other-timestamp">06:25AM</span>
                <div className="others">\/</div>
            </div>
        </div>
    );
};

export default connect(null, mapDispatchToProps)(Contact);
