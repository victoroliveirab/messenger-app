import React from "react";
import ContactList from "../ContactList/contactlist.component";
import SearchBox from "../SearchBox/searchbox.components";

const leftBar = () => {
    return (
        <React.Fragment>
            <SearchBox />
            <ContactList auth={sessionStorage.getItem("auth")} />
        </React.Fragment>
    );
};

export default leftBar;
