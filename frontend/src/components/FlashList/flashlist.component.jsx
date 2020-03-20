import React from "react";
import Flash from "../Flash/flash.component";
import { connect } from "react-redux";

const FlashList = props => {
    return (
        <div>
            {props.flashes.map((flash, i) => (
                <Flash key={i} type={flash.type} message={flash.message} />
            ))}
        </div>
    );
};

const mapStateToProps = state => ({
    flashes: state.flashList.flashes
});

export default connect(mapStateToProps)(FlashList);
