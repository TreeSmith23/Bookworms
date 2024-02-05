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
import restClient from "../API";
import ProfileListing from './ProfileListing';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        //console.log("this->>>" + sessionStorage.getItem("userData"));
        // console.log("I AM HERE");
        // console.log(sessionStorage.getItem("userData"));
        this.state = {
            username: JSON.parse(sessionStorage.getItem("userData"))[0].username,
            firstname: JSON.parse(sessionStorage.getItem("userData"))[0].firstname,
            lastname: JSON.parse(sessionStorage.getItem("userData"))[0].lastname,
            email: JSON.parse(sessionStorage.getItem("userData"))[0].email,
            university: JSON.parse(sessionStorage.getItem("userData"))[0].university,

            ISBN: '',
            Title: '',
            Price: '',
          };
        this.changePage = this.changePage.bind(this);
        this.createListing = this.createListing.bind(this);
        this.handleISBN = this.handleISBN.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handlePrice = this.handlePrice.bind(this);

    }

    changePage(event){
        window.location.replace("/");
          
    }

    createListing(event) {
        const {
            ISBN,
            Title,
            Price,
            username,
        } = this.state;
        console.log(ISBN);
        console.log(Title);
        console.log(Price);
        restClient.get('createBook/?isbn='+ISBN+'&title='+Title+'&username='+username+'&price='+Price+'')
        .then(function(response) {
            console.log("WE MADE A NEW BOOK");
        })
        window.location.reload(true);
    }

    handleISBN(event) {
        event.preventDefault();
        this.setState({
            ISBN: event.target.value,
        });
    }
    handleTitle(event) {
        event.preventDefault();
        this.setState({
            Title: event.target.value,
        });
    }
    handlePrice(event) {
        event.preventDefault();
        this.setState({
            Price: event.target.value,
        });
    }


    render() {
        return (
            // <div style={{overflow: "scroll", height: "fit-content"}}>
                <Grid container spacing={1}>
                    <Grid item  
                        direction="column"
                        alignItems="flex-end"
                        justifyContent="flex-start">
                        <Button color="primary" variant="contained" onClick={(e) => this.changePage(e)}>Home</Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography component="h1" variant="h1">
                            Profile
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
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} align="center">
                        <Typography component="h4" variant="h4">
                            Your Listings
                        </Typography>
                    </Grid>

                        <Grid item xs={1}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2} align="center">
                        <Typography component="h5" variant="h5">{'Title'}</Typography>
                        </Grid>
                        <Grid item xs={2} align="center">
                        <Typography component="h5" variant="h5">{'Selling Price'}</Typography>
                        </Grid>
                        <Grid item xs={2} align="center">
                        <Typography component="h5" variant="h5">{'Seller'}</Typography>
                        </Grid>

                        {JSON.parse(localStorage.getItem("profileData")).data.map((item) => (
                            <Grid item xs={12} align="center">
                                <ProfileListing item={item} />
                            </Grid>
                        ))}

                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} align="center">
                        <Typography component="h4" variant="h4">
                            Create Your Own Listing
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                            onChange={(e) => this.handleISBN(e)}
                            required={true}
                            type="text"
                            label="ISBN"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                            onChange={(e) => this.handleTitle(e)}
                            required={true}
                            type="text"
                            label="Title"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                            onChange={(e) => this.handlePrice(e)}
                            required={true}
                            type="text"
                            label="Your Price"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button id="sign_in" color="primary" variant="contained" onClick={(e) => this.createListing(e)}>
                            Add Listing
                        </Button>
                    </Grid>
                </Grid>
            // {/* </div> */}
        );
    }
}