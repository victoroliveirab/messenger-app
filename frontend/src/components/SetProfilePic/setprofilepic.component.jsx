import React from "react";
import { connect } from "react-redux";

import { dispatchGet, dispatchPost } from "../../utils/request";

import "./setprofilepic.style.css";

class SetProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            hasUploaded: false,
            loading: true
        };
        this.currentPicture = null;
    }

    handleSubmit = async event => {
        event.preventDefault();
        console.log(this.state);
        const formData = new FormData();
        formData.append("file", this.state.file);
        await dispatchPost("/avatar", formData, this.props.token).catch(err =>
            console.error(err)
        );
    };

    handleChange = event => {
        this.setState({ file: event.target.files[0] });
    };

    async componentDidMount() {
        await dispatchGet("/avatar", this.props.token).then(response => {
            this.currentPicture = response.data.image;
            this.setState({ loading: false });
        });
    }

    render() {
        if (this.state.loading) {
            return "loading image...";
        }
        return (
            <div className="set-profile-pic">
                <div className="set-profile-pic__outer-circle">
                    <img
                        src={`data:image/png;base64,${this.currentPicture}`}
                        alt="Current profile avatar"
                        className="img img-rounded"
                    />
                </div>
                <form
                    className="set-profile-pic-form"
                    noValidate
                    onSubmit={this.handleSubmit}
                >
                    <div className="file-container">
                        <button className="select-image">Select Photo</button>
                        <input
                            name="file"
                            type="file"
                            onChange={this.handleChange}
                            accept="image/png"
                            className="fileup"
                        />
                    </div>
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
