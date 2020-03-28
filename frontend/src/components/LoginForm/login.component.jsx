import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import {
    setToken,
    setUser,
    setRememberMe
} from "../../redux/user/user.actions";
import { addFlash } from "../../redux/flashList/flashList.actions";

import { dispatchGet, dispatchPost } from "../../utils/request";

const styles = theme => ({
    form: {
        width: "100%"
    },
    submit: {
        margin: theme.spacing(1, 0, 2)
    }
});

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rememberMe: false
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { username, password, rememberMe } = this.state;
        let token;
        await dispatchPost("/login", { username, password })
            .then(response => {
                token = response.headers.authorization;
                this.props.setToken(token);
            })
            .catch(() =>
                this.props.addFlash({
                    type: "danger",
                    message: "Wrong Username and/or password"
                })
            );
        await dispatchGet("/users", token)
            .then(response => this.props.setUser(response.data))
            .catch(err => {
                this.props.addFlash({
                    type: "danger",
                    message: "Unknown"
                });
            });
        this.props.setRememberMe(rememberMe);
    };

    handleChange = event => {
        let name, value;
        if (event.target.name === "rememberMe") {
            name = "rememberMe";
            value = event.target.checked;
        } else {
            name = event.target.name;
            value = event.target.value;
        }
        this.setState({ [name]: value });
    };

    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="xs">
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={this.handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="username"
                                label="Username"
                                required
                                placeholder="Username"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="password"
                                label="Password"
                                required
                                placeholder="Password"
                                fullWidth
                                type="password"
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        checked={this.state.rememberMe}
                                        color="primary"
                                        onChange={this.handleChange}
                                    />
                                }
                                label="Remember Me"
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign up!
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addFlash: flash => dispatch(addFlash(flash)),
    setUser: user => dispatch(setUser(user)),
    setToken: token => dispatch(setToken(token)),
    setRememberMe: rememberMe => dispatch(setRememberMe(rememberMe))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(LoginForm));
