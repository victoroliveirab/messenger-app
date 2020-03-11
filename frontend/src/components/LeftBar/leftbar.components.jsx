import React from "react";
import ContactList from "../ContactList/contactlist.component";
import SearchBox from "../SearchBox/searchbox.components";
import "./leftbar.styles.css";

const leftBar = () => {
    return (
        <div className="left-bar">
            <SearchBox className="searchbox-container" />
            <ContactList
                className="contact-list-container"
                auth={sessionStorage.getItem("auth")}
            />
        </div>
    );
};

export default leftBar;
