import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, authenticated, ...other }) => (
    <Route
        {...other}
        render={props =>
            authenticated ? (
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

const mapStateToProps = state => ({
    authenticated: !!state.user.auth
});
export default connect(mapStateToProps)(PrivateRoute);
