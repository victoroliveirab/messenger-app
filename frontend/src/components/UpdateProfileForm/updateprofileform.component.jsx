import React from "react";
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
                            <label for="name">Name</label>
                            <input
                                type="text"
                                className="form-control update-profile-form__field"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label for="email">E-mail</label>
                            <input
                                type="email"
                                className="form-control update-profile-form__field"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                className="form-control update-profile-form__field"
                            />
                        </div>
                        <div className="col-6">
                            <label for="password-confirmation">
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
            </div>
        );
    }
}

export default UpdateProfileForm;
