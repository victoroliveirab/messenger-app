import React from "react";
import eric from "../../utils/eric.jpg";
import { connect } from "react-redux";

import "./avatar.style.css";

const axios = require("axios");

class Avatar extends React.Component {
    constructor(props) {
        console.log("avatar");
        super(props);
        this.state = {
            loading: true
        };
        this.img = null;
    }

    fetchAvatar = async (username, auth) => {
        let avatar = null;
        try {
            const response = await axios.get(`/avatar/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth
                }
            });
            console.log(response);
            this.img = response.data;
            this.setState({ loading: false });
        } catch (err) {
            console.error(err);
        }
    };

    componentDidMount() {
        this.fetchAvatar(this.props.username, this.props.auth);
    }

    render() {
        if (this.state.loading) {
            return "";
        }
        console.log(this.img);
        return (
            <div className="img-wrapper">
                <img
                    src={`data:image/png;base64,${this.img}`}
                    alt=""
                    className={`img ${true ? "img-rounded" : ""}`}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.user.auth
});
export default connect(mapStateToProps)(Avatar);
