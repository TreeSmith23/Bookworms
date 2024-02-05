import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import axios from 'axios';
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import restClient from "../API";



export default class HomeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isbn: '',
            title: '',

        };
        this.getPrice = this.getPrice.bind(this);
        this.handleSearchISBN = this.handleSearchISBN.bind(this);
        this.handleSearchTitle = this.handleSearchTitle.bind(this);
        this.changePage = this.changePage.bind(this);
        this.findResults = this.findResults.bind(this);
        this.findUser = this.findUser.bind(this);
        this.findUserListings = this.findUserListings.bind(this);
    }

    changePage(event){
        if (sessionStorage.getItem("token") == null) {
            window.location.replace("/signin");
          } else {
            this.findUser();
          }

    }

    async findResults(event){
        const {
            isbn,
            title,
        } = this.state;
        if(title == ''){
            await this.getPrice(event)
            await restClient.get('isBookAvailable/?isbn='+isbn+'')
            .then(function (response){
                console.log("LOOKUP->>>>" + JSON.stringify(response));
                sessionStorage.setItem("lookup", JSON.stringify(response));
                console.log("lookup->>>>" + sessionStorage.getItem("lookup"));
                // while(true) {
                //     if (sessionStorage.getItem("info")==null) {
                //         continue;
                //     }
                //     else {
                //         break;
                //     }
                // }
            })
            window.location.replace("/result");
        }
        else{
            await this.findISBN(event);
            await  restClient.get('isBookAvailable/?title='+title+'')
            .then(function (response){
                console.log("LOOKUP->>>>" + JSON.stringify(response));
                sessionStorage.setItem("lookup", JSON.stringify(response));
                console.log("lookup->>>>" + sessionStorage.getItem("lookup"));
                // while(true) {
                //     if (sessionStorage.getItem("info")==null) {
                //         continue;
                //     }
                //     else {
                //         break;
                //     }
                // }
            })
            window.location.replace("/result");
        }
        
    }

    async findISBN(event) {
        const {
            title,
        } = this.state;
        console.log(title);
        await restClient.get('find/?title=' + title + '')
            .then(function (response) {
                sessionStorage.setItem("isbn", JSON.stringify(response));
                sessionStorage.setItem("isbn", sessionStorage.getItem("isbn").substring(17,sessionStorage.getItem("isbn").search('}') - 1));
            })
        this.state.isbn = sessionStorage.getItem("isbn");
        await this.getPrice(event);
    }

    async getPrice(event) {
        const {
            isbn,
            title,
        } = this.state;
        console.log(isbn);
        try {
            const response = await restClient.get('generalInfo/?isbn=' + isbn + '')
                // .then(function (response) {
                    sessionStorage.setItem("info", JSON.stringify(response));
                    sessionStorage.setItem("info", sessionStorage.getItem("info").substring(0,8) + "[" + sessionStorage.getItem("info").substring(8, sessionStorage.getItem("info").search('}') + 1) + "]" + sessionStorage.getItem("info").substring(sessionStorage.getItem("info").search('}') + 1));
                    console.log("info>>>" + sessionStorage.getItem("info"));
                // })  
        }
        catch (error) {
            if (title == "") {
                sessionStorage.setItem("info", "{\"data\":[{\"isbn\":\"" + isbn + "\",\"name\":\"N/A\",\"writers\":\"N/A\"}]}");
            } else {
                sessionStorage.setItem("info", "{\"data\":[{\"isbn\":\"" + isbn + "\",\"name\":\"" + title + "\",\"writers\":\"N/A\"}]}");
            }
        }
        try {
            const respose = await restClient.get('corsTest/?isbn=' + isbn +'')
                // .then(function (response) {
                    sessionStorage.setItem("cover", "{\"url\":[{\"image\":\"https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg\"}]}");
                    console.log(sessionStorage.getItem("cover"));
                    sessionStorage.setItem("pricing", JSON.stringify(respose));
                    sessionStorage.setItem("pricing", sessionStorage.getItem("pricing").substring(0,8) + "[" + sessionStorage.getItem("pricing").substring(8, sessionStorage.getItem("pricing").search('}') + 1) + "]" + sessionStorage.getItem("pricing").substring(sessionStorage.getItem("pricing").search('}') + 1));
                    console.log("pricing>>>" + sessionStorage.getItem("pricing"));
        }
        catch (error) {
            console.log("corsTest error");
            sessionStorage.setItem("cover", "{\"url\":[{\"image\":\"https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg\"}]}");
            sessionStorage.setItem("pricing", "{\"data\":[{\"avg\":N/A,\"good\":N/A,\"new\":N/A}]}")
        }
                // console.log(sessionStorage.getItem("pricing"));
                // console.log(response);
                // window.location.replace("/result");
            // })
            // .catch(function (error) {
            //     console.log(error);
            // })
    }

    handleSearchISBN(event) {
        event.preventDefault();
        this.setState({
            isbn: event.target.value,
        });
    }

    handleSearchTitle(event) {
        event.preventDefault();
        this.setState({
            title: event.target.value,
        });
    }

    findUser(event){

        restClient.get('getUserData/?userName='+sessionStorage.getItem("userName")+'')
        .then((response) =>{
            //console.log("this->>>" + response);
            sessionStorage.setItem("userData", JSON.stringify(response.data));
            //console.log(sessionStorage.getItem("userData"));
            this.findUserListings();
        })
    
    }

    findUserListings (event) {
        restClient.get('userBooks/?userName='+sessionStorage.getItem("userName")+'')
        .then(function (response){
            console.log("EVERYTHING LINKED");
            localStorage.setItem("profileData", JSON.stringify(response));
            console.log(localStorage.getItem("profileData"));
            window.location.replace("/profile");
        })
    }


    render() {
        
        return (
            <Grid container spacing={1}>
                <Grid item  
                    direction="column"
                    alignItems="flex-end"
                    justifyContent="flex-start">
                    
                    <Button color="primary" variant="contained" onClick={(e) => this.changePage(e)}>
                        Profile
                    </Button>
                </Grid>
                <div className="center">
                    <Grid item xs={12} align="center">
                        <Typography component="h1" variant="h1">
                            BookWorms
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        
                        <FormControl>
                        <TextField
                            fullWidth
                            onChange={(e) => this.handleSearchTitle(e)}
                            required={true}
                            type="text"
                            label="Title"
                            variant="filled"
                            />
                            --OR--
                            <TextField
                            fullWidth
                            onChange={(e) => this.handleSearchISBN(e)}
                            required={true}
                            type="text"
                            label="ISBN"
                            variant="filled"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="secondary" variant="contained" onClick={(e) => this.findResults(e)}>
                            SEARCH
                        </Button>
                    </Grid>
                </div>
            </Grid>
        );
    }
}
