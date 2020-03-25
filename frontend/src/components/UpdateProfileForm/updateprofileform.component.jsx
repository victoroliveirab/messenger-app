import React from "react";
import { connect } from "react-redux";

import "./updateprofileform.style.css";

class UpdateProfileForm extends React.Component {
    render() {
        return (
            <div className="update-profile-form container">
                <div className="row">
                    <div className="col-xs-6">
                        <h2 className="profile-form__title">Profile</h2>
                    </div>
                </div>
                <form noValidate>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                className="form-control update-profile-form__field"
                                value={this.props.info.name}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control update-profile-form__field"
                                value={this.props.info.username}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                className="form-control update-profile-form__field"
                                value={this.props.info.email}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control update-profile-form__field"
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="password-confirmation">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control update-profile-form__field"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                <div className="row delete-profile">
                    <button type="button" className="btn btn-danger">
                        Delete Account
                    </button>
                    <p>Be careful, this will delete your account permanently</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.username,
    info: state.user.user
});

export default connect(mapStateToProps)(UpdateProfileForm);
