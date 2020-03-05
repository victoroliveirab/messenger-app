import React from "react";
import ContactList from "../../components/ContactList/contactlist.component";

const mainPage = () => {
    return <ContactList auth={sessionStorage.getItem("auth")} />;
};

export default mainPage;
