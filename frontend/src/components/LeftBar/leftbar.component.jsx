import React from "react";
import ContactList from "../ContactList/contactlist.component";
import SearchBox from "../SearchBox/searchbox.component";
import "./leftbar.style.css";

const leftBar = () => {
    return (
        <div className="left-bar">
            <SearchBox className="searchbox-container" />
            <ContactList
                className="contact-list-container"
                auth={sessionStorage.getItem("pitangAuth")}
            />
        </div>
    );
};

export default leftBar;
