import React from "react";
import TopBar from "../../components/TopBar/topbar.component";
import LeftBar from "../../components/LeftBar/leftbar.component";
import RightBar from "../../components/RightBar/rightbar.component";
import { connect } from "react-redux";
import SetProfilePic from "../../components/SetProfilePic/setprofilepic.component";
import UpdateProfileForm from "../../components/UpdateProfileForm/updateprofileform.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./messageapp.style.css";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChat: null
        };
    }

    //TODO
    // REFACTOR THESE INTO SPECIFIC COMPONENTS

    renderTop() {
        switch (this.props.path) {
            case "/profile":
                return (
                    <div className="top-bar-return">
                        <a role="button" className="btn" href="/">
                            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                        </a>
                    </div>
                );
            default:
                return <TopBar />;
        }
    }

    renderBottom() {
        switch (this.props.path) {
            case "/profile":
                return (
                    <>
                        <div className="col-3 full-height">
                            <SetProfilePic />
                        </div>
                        <div className="col-9 full-height">
                            <UpdateProfileForm />
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <div className="col-3 full-height">
                            <LeftBar />
                        </div>
                        <div className="col-9 full-height">
                            <RightBar />
                        </div>
                    </>
                );
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row no-gutters top-bar-container">
                    {this.renderTop()}
                </div>
                <div className="row no-gutters bottom-bar">
                    {this.renderBottom()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    path: state.router.location.pathname
});

export default connect(mapStateToProps)(MainPage);
