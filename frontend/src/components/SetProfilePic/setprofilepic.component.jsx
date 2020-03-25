import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./setprofilepic.style.css";

const axios = require("axios");

class SetProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            hasUploaded: false
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        console.log(this.state);
        const formData = new FormData();
        formData.append("file", this.state.file);
        try {
            const response = await axios.post("/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: this.props.token
                }
            });
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };

    handleChange = event => {
        this.setState({ file: event.target.files[0] });
    };

    render() {
        return (
            <div className="set-profile-pic">
                <div className="set-profile-pic__outer-circle">
                    <FontAwesomeIcon
                        icon={faUser}
                        size="10x"
                        className="set-profile-pic__picture"
                    />
                </div>
                <form noValidate onSubmit={this.handleSubmit}>
                    <input
                        name="file"
                        type="file"
                        onChange={this.handleChange}
                    />
                    <button type="submit" className="set-profile-pic__button">
                        Change Picture
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.user.token
});

export default connect(mapStateToProps)(SetProfilePic);
