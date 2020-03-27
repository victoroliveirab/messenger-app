import React from "react";
import { setToken, setUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { dispatchGet } from "../../utils/request";

class LoadingScreen extends React.Component {
    componentDidMount = async () => {
        dispatchGet("/users", this.props.token)
            .then(response => {
                this.props.setUser(response.data);
            })
            .catch(() => {
                this.props.setToken(null);
            });
    };
    render() {
        return <>Loading</>;
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    setToken: token => dispatch(setToken(token)),
    setUser: user => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
