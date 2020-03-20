import React from "react";
import TopBar from "../../components/TopBar/topbar.component";
import LeftBar from "../../components/LeftBar/leftbar.component";
import RightBar from "../../components/RightBar/rightbar.component";
import { connect } from "react-redux";

import "./messageapp.style.css";

const MainPage = () => (
    <div className="container-fluid">
        <div className="row no-gutters top-bar-container">
            <TopBar />
        </div>
        <div className="row no-gutters bottom-bar">
            <div className="col-3 full-height">
                <LeftBar />
            </div>
            <div className="col-9 full-height">
                <RightBar />
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    path: state.router.location.pathname
});

export default connect(mapStateToProps)(MainPage);
