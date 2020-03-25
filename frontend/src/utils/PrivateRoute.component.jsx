import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, token, ...other }) => {
    console.log("token " + token);
    return (
        <Route
            {...other}
            render={props =>
                token ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};
const mapStateToProps = state => ({
    token: state.user.token
});
export default connect(mapStateToProps)(PrivateRoute);
