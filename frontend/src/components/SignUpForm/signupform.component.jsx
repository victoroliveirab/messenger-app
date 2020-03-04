import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
//import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import DatePicker from "../DatePicker/datepicker.component";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import "./signupform.styles.css";
const axios = require("axios");

const styles = theme => ({
    form: {
        width: "100%"
    },
    submit: {
        margin: theme.spacing(1, 0, 2)
    }
});

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

    handleSubmit = async event => {
        event.preventDefault();
        console.log(this.state);
        console.log("--------------------");
        const {
            name,
            username,
            email,
            password,
            password_confirmation
        } = this.state;
        console.log(this.state);
        if (password !== password_confirmation) {
            alert("Passwords dont match");
            return;
        }
        const birthday = this.state.birthday.replace(/\//g, "-");
        try {
            const response = await axios.post(
                "/signup",
                {
                    name,
                    username,
                    password,
                    email,
                    birthday
                },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log(response);
        } catch (err) {
            console.log(this.state);
            console.error(err);
        }
    };

    handleChange = event => {
        //TODO when leave email or username field, async a get from the server to see if
        // entry already in use!
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(this.state);
    };

    handleBirthday = date => this.setState({ birthday: date });

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
                            <DatePicker updateBirthday={this.handleBirthday} />
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
                            className={classes.submit}
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

export default withStyles(styles)(Signup);
