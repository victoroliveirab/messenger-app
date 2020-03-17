import React from "react";
import { removeFlash } from "../../redux/flashList/flashList.actions";
import { connect } from "react-redux";

const Flash = props => {
    return (
        <div className={`flash flash-${props.type}`}>
            {props.message}
            <button
                type="button"
                aria-label="Close"
                onClick={() => props.removeFlash(props.message)}
            >
                <span aria-hidden="true"> &times; </span>
            </button>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    removeFlash: flash => dispatch(removeFlash(flash))
});

export default connect(null, mapDispatchToProps)(Flash);
