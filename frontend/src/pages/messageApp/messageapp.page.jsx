import React from "react";
import TopBar from "../../components/TopBar/topbar.component";
import LeftBar from "../../components/LeftBar/leftbar.component";
import RightBar from "../../components/RightBar/rightbar.component";
import LoadingScreen from "../../components/LoadingScreen/loadingscreen.component";
import Modal from "../../components/Modal/modal.component";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import "../mainlayout.css";
import "./messageapp.style.css";

const MainPage = props => {
    if (!props.user) {
        return <LoadingScreen />;
    } else if (!props.token) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: "/" }
                }}
            />
        );
    }
    return (
        <div className="main-wrapper">
            <div className="red-rectangle"></div>
            <div className="modal-wrapper">
                <Modal
                    type={props.type}
                    onClose={props.toggleShow}
                    show={props.show}
                />
            </div>
            <div
                className={`container-fluid main ${
                    props.show ? "main-hide" : null
                }`}
            >
                <div className="row no-gutters top-bar-container">
                    <TopBar />
                </div>
                <div className="row no-gutters bottom-bar">
                    <div className="col-4 full-height">
                        <LeftBar />
                    </div>
                    <div className="col-8 full-height">
                        <RightBar />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    token: state.user.token,
    user: state.user.user,
    path: state.router.location.pathname,
    show: state.modal.show
});

export default connect(mapStateToProps)(MainPage);
