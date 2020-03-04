import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
//import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const axios = require("axios");

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
            name: "",
            password: ""
        };
    }

    // useStyles = makeStyles(theme => ({
    //     form: {
    //         width: "100%"
    //     },
    //     submit: {
    //         margin: theme.spacing(1, 0, 2)
    //     }
    // }));

    handleSubmit = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        try {
            const response = await axios.post(
                "/login",
                {
                    username,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            sessionStorage.setItem("auth", response.headers.authorization);
            this.props.redirectFn();
        } catch (err) {
            console.error(err);
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(this.state);
    };

    render() {
        const classes = this.props;
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
                                        value="acceptTerms"
                                        color="primary"
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

export default withStyles(styles)(LoginForm);
