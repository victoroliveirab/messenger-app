import React from "react";
import TopBar from "../../components/TopBar/topbar.components";
import LeftBar from "../../components/LeftBar/leftbar.components";
import RightBar from "../../components/RightBar/rightbar.components";
import Grid from "@material-ui/core/Grid";

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
            <Grid container spacing={2} className="base-grid">
                <Grid item xs={12}>
                    <TopBar className="top-bar" />
                </Grid>
                <Grid className="left-bar-container" item xs={3} height="100%">
                    <LeftBar className="left-bar" />
                    {/* todo: make leftbar grow whole remaining height */}
                </Grid>
                <Grid className="right-bar-container" item xs={9} height="100%">
                    <RightBar className="right-bar" />
                </Grid>
            </Grid>
        );
    }
}

export default MainPage;
