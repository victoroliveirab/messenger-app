import React from "react";
import ContactList from "../ContactList/contactlist.component";
import SearchBox from "../SearchBox/searchbox.component";
import SetProfilePic from "../SetProfilePic/setprofilepic.component";
import "./leftbar.style.css";
import { connect } from "react-redux";

const leftBar = props => {
    switch (props.path) {
        case "/profile":
            return <SetProfilePic />;
        case "/message":
            return <ContactList />;
        default:
            return (
                <div className="leftbar-default">
                    <SearchBox className="searchbox-container" />
                    <ContactList
                        className="contact-list-container"
                        auth={sessionStorage.getItem("pitangAuth")}
                    />
                </div>
            );
    }
};

const mapStateToProps = state => ({
    path: state.router.location.pathname
});

export default connect(mapStateToProps)(leftBar);
