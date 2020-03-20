import React from "react";
//import eric from "../../utils/eric.jpg";
import { connect } from "react-redux";

import "./avatar.style.css";

const axios = require("axios");

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.img = null;
    }

    fetchAvatar = async (username, auth) => {
        try {
            const response = await axios.get(`/avatar/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth
                },
                timeout: 8000
            });
            this.img = response.data.image;
            this.setState({ loading: false });
        } catch (err) {
            //todo Add flash message to page when error occured (with relevant message)
            console.error(err);
        }
    };

    componentDidMount = async () =>
        this.fetchAvatar(this.props.username, this.props.auth);

    render() {
        if (this.state.loading) {
            return "";
        }
        return (
            <div className="img-wrapper">
                <img
                    src={`data:image/png;base64,${this.img}`}
                    alt={`${this.props.username}`}
                    className={`img ${this.props.rounded ? "img-rounded" : ""}`}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.user.auth
});
export default connect(mapStateToProps)(Avatar);
