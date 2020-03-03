import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "../DatePicker/datepicker.component";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import "./signup.styles.css";
const axios = require("axios");

// const useStyles = makeStyles(theme => ({
//     form: {
//         width: "100%"
//     },
//     submit: {
//         margin: theme.spacing(1, 0, 2)
//     }
// }));

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            birthday: "",
            password: ""
        };
    }

    useStyles = makeStyles(theme => ({
        form: {
            width: "100%"
        },
        submit: {
            margin: theme.spacing(1, 0, 2)
        }
    }));

    handleSubmit = async event => {
        event.preventDefault();
        const {
            name,
            username,
            email,
            password,
            password_confirmation
        } = this.state;
        if (password != password_confirmation) {
            console.log(password);
            console.log(password_confirmation);
            alert("Passwords dont match");
            console.log(this.state);
            return;
        }
        const birthday = this.state.birthday.replace(/\//g, "-");
        try {
            await axios.post(
                "/signup",
                {
                    name,
                    username,
                    password,
                    email,
                    birthday
                },
                ("headers": {
                    "Content-Type": "application/json"
                })
            );
        } catch (err) {}
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(this.state);
    };

    render() {
        //const classes = this.useStyles();
        return (
            <Container maxWidth="xs">
                <form
                    // className={classes.form}
                    noValidate
                    onSubmit={this.handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Full Name"
                                required
                                placeholder="Full Name"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                name="email"
                                label="E-mail"
                                required
                                placeholder="E-mail"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="username"
                                label="Username"
                                required
                                placeholder="Username"
                                fullWidth
                                className="username"
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* <DatePicker /> */}
                            <TextField
                                name="birthday"
                                label="Birthday"
                                required
                                placeholder="Birthday"
                                fullWidth
                                type="text"
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="password_confirmation"
                                label="Confirm Password"
                                required
                                placeholder="Confirm Password"
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
                                label="I accept terms and conditions"
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default Signup;
