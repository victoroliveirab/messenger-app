import React from "react";
import TopBar from "../../components/TopBar/topbar.components";
import LeftBar from "../../components/LeftBar/leftbar.components";
import RightBar from "../../components/RightBar/rightbar.components";

import "./messageapp.styles.css";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChat: null
        };
    }

    render() {
        return (
            <div className="base-grid">
                <div className="top-container">
                    <TopBar />
                </div>
                <div className="bottom-container">
                    <div className="left-bar-container">
                        <LeftBar />
                    </div>
                    <div className="right-bar-container">
                        <RightBar />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;
