import React from "react";
import "./modal.style.css";
import { modals } from "./modals";
import { toggleShow, resetModal } from "../../redux/modal/modal.actions";

import { connect } from "react-redux";

class Modal extends React.Component {
    closeModal = () => {
        this.props.resetModal();
        this.props.toggleShow();
    };
    render() {
        if (!this.props.show) {
            console.log("hide");
            return null;
        }
        switch (this.props.type) {
            case "DELETE_CONVERSATION":
                console.log(this.props.options);
                return (
                    <div className="modal-container">
                        <div className="modal-box">
                            <h2 className="modal-box__title">{`Delete conversation with ${this.props.options.contact.name}?`}</h2>
                            <div className="modal-box__content">
                                This action cannot be undone.
                            </div>
                            <div className="modal-box__actions">
                                <button
                                    className="button button-danger"
                                    onClick={this.closeModal}
                                >
                                    Delete
                                </button>
                                <button
                                    className="button button-regular"
                                    onClick={this.closeModal}
                                >
                                    never mind
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="modal-container">
                        <div className="modal-box">
                            <h2>Unknown Action</h2>
                            <div className="content">
                                An unknown action has been performed
                            </div>
                            <div className="actions">
                                <button
                                    className="btn button-danger toggle-button"
                                    onClick={this.closeModal}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    type: state.modal.type,
    options: state.modal.options
});

const mapDispatchToProps = dispatch => ({
    toggleShow: () => dispatch(toggleShow()),
    resetModal: () => dispatch(resetModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
