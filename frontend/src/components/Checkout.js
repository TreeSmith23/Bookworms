import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: JSON.parse(sessionStorage.getItem("sellerData"))[0].username,
            firstname: JSON.parse(sessionStorage.getItem("sellerData"))[0].firstname,
            lastname: JSON.parse(sessionStorage.getItem("sellerData"))[0].lastname,
            email: JSON.parse(sessionStorage.getItem("sellerData"))[0].email,
            university: JSON.parse(sessionStorage.getItem("sellerData"))[0].university,


          };
        this.changePage = this.changePage.bind(this);

    }
    changePage(event){
        window.location.replace("/result");
          
    }


    render() {
        return (
            <Grid container spacing={1}>
                <Grid item  
                        direction="column"
                        alignItems="flex-end"
                        justifyContent="flex-start">
                        <Button color="primary" variant="contained" onClick={(e) => this.changePage(e)}>Results</Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography component="h1" variant="h1">
                            <u>Checkout</u>
                        </Typography>
                    </Grid>

                    <Grid item xs={12} align="center">
                        <Typography component="h6" variant="h6">
                            Seller:
                        </Typography>
                    </Grid>

                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                            required={true}
                            type="text"
                            label=""
                            disabled={true}
                            defaultValue={this.state.username}
                            />
                        </FormControl>
                        <FormHelperText>
                            <div align="center">Username</div>
                        </FormHelperText>
                    </Grid>
                    
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                            required={true}
                            type="text"
                            label=""
                            disabled={true}
                            defaultValue={this.state.firstname}
                            />
                        </FormControl>
                        <FormHelperText>
                            <div align="center">First Name</div>
                        </FormHelperText>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                            required={true}
                            type="text"
                            label=""
                            disabled={true}
                            defaultValue={this.state.lastname}
                            />
                        </FormControl>
                        <FormHelperText>
                            <div align="center">Last Name</div>
                        </FormHelperText>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                            required={true}
                            type="text"
                            label=""
                            disabled={true}
                            defaultValue={this.state.email}
                            />
                        </FormControl>
                        <FormHelperText>
                            <div align="center">Email</div>
                        </FormHelperText>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                            required={true}
                            type="text"
                            label=""
                            disabled={true}
                            defaultValue={this.state.university}
                            />
                        </FormControl>
                        <FormHelperText>
                            <div align="center">University</div>
                        </FormHelperText>
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid

                    container
                    spacing={0}
                    align="center"
                    justify="center"
                    direction="column">
                    <p>
                        Displayed above is the contact information for the seller
                        {" \"" + this.state.username + "\""}. If you would like to continue the purchase of
                        this book please send them an email and set up a meeting
                        time on campus to exchange the book for the agreed upon amount
                        of money. Please be safe and perform all transactions in public
                        areas during day time hours.
                    </p>
                </Grid>
            </Grid>
        );
    }
}