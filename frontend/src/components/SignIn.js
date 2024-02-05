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
import axios from 'axios';
import { Axios } from 'axios';
import restClient from "../API";



export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInNme: '',
            signInPwd: '',
            usrname: '',
            password: '',
            firstnme: '',
            lastnme: '',
            email: '',
            uni: '',
          };
        this.selectSection = this.selectSection.bind(this);

        this.validateLogIn = this.validateLogIn.bind(this);
        this.handleTextFieldSignInNme = this.handleTextFieldSignInNme.bind(this);
        this.handleTextFieldSignInPwd = this.handleTextFieldSignInPwd.bind(this);

        this.handleTextFieldCreateUsernme = this.handleTextFieldCreateUsernme.bind(this);
        this.handleTextFieldCreatePasswrd = this.handleTextFieldCreatePasswrd.bind(this);
        this.handleTextFieldCreateFirstnme = this.handleTextFieldCreateFirstnme.bind(this);
        this.handleTextFieldCreateLastnme = this.handleTextFieldCreateLastnme.bind(this);
        this.handleTextFieldCreateEmail = this.handleTextFieldCreateEmail.bind(this);
        this.handleTextFieldCreateUni = this.handleTextFieldCreateUni.bind(this);
        this.createAccount = this.createAccount.bind(this);

    }
    
    async validateLogIn(event) {
        const {
            signInNme,
        } = this.state;
        const {
            signInPwd,
        } = this.state;
        console.log(signInNme);
        console.log(signInPwd);

        // https://bookworms-project3.herokuapp.com/token/
        // http://127.0.0.1:8000/token/
        await axios.post('https://bookworms-project3.herokuapp.com/token/', {username: signInNme, password: signInPwd})
            .then(function (response){
                console.log(response.data.access);
                console.log(response.status);
                sessionStorage.setItem("token", response.data.access);


        })  .catch(function (error) {
                console.log("Error");
        
        })  .finally(() => {
            if (sessionStorage.getItem("token") == null){
                console.log("Try again");
            }
            else{
                console.log(sessionStorage.getItem("token"));
                sessionStorage.setItem("userName", signInNme);
                console.log("you got your token!\nNow back to the home page!");
                window.location.replace("/");
            }
                
        })
        
    }

    //   this pair of functions updates the global variable for the username and password
    handleTextFieldSignInNme(event) {
        event.preventDefault();
        this.setState({
          signInNme: event.target.value,
        });
      }
    handleTextFieldSignInPwd(event) {
        event.preventDefault();
        this.setState({
          signInPwd: event.target.value,
        });
      }


      handleTextFieldCreateUsernme(event) {
        event.preventDefault();
        this.setState({
          usrname: event.target.value,
          signInNme: event.target.value,
        });
      }
      handleTextFieldCreatePasswrd(event) {
        event.preventDefault();
        this.setState({
          password: event.target.value,
          signInPwd: event.target.value,
        });
      }
      handleTextFieldCreateFirstnme(event) {
        event.preventDefault();
        this.setState({
          firstnme: event.target.value,
        });
      }
      handleTextFieldCreateLastnme(event) {
        event.preventDefault();
        this.setState({
          lastnme: event.target.value,
        });
      }
      handleTextFieldCreateEmail(event) {
        event.preventDefault();
        this.setState({
          email: event.target.value,
        });
      }
      handleTextFieldCreateUni(event) {
        event.preventDefault();
        this.setState({
          uni: event.target.value,
        });
      }


      async createAccount(event) {
        const {
            usrname,
            password,
            firstnme,
            lastnme,
            email,
            uni,
        } = this.state;
        
        await restClient.get('createAccount/?username='+usrname+'&password='+password+'&firstname='+firstnme+'&lastname='+lastnme+'&email='+email+'&university='+uni+'')
        .then(function(response) {
            console.log("youre a user");
            
        })
        await this.validateLogIn(event);
    }


    selectSection(username, password){
        console.log(username);
        console.log(password);
        console.log(signInNme);
        // const config = {
        //     headers: { Authorization: `Bearer ${token}` }
        // };
        // axios.get("http://127.0.0.1:8000/createuser", );
        // axios.post('http://127.0.0.1:8000/token/', {username: "", password: ""})
      }



    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Login
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField id = "signInNme"
                        onChange={(e) => this.handleTextFieldSignInNme(e)}
                        required={true}
                        type="text"
                        label="Username"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField id = "signInPwd"
                        onChange={(e) => this.handleTextFieldSignInPwd(e)}
                        required={true}
                        type="text"
                        label="Password"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button id="sign_in" color="primary" variant="contained" onClick={(e) => this.validateLogIn(e)}>
                        Sign In
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create Account
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                        onChange={(e) => this.handleTextFieldCreateUsernme(e)}
                        required={true}
                        type="text"
                        label="Username"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                        onChange={(e) => this.handleTextFieldCreatePasswrd(e)}
                        required={true}
                        type="text"
                        label="Password"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                        onChange={(e) => this.handleTextFieldCreateFirstnme(e)}
                        required={true}
                        type="text"
                        label="First Name"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                        onChange={(e) => this.handleTextFieldCreateLastnme(e)}
                        required={true}
                        type="text"
                        label="Last Name"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                        onChange={(e) => this.handleTextFieldCreateEmail(e)}
                        required={true}
                        type="text"
                        label="Email"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                        onChange={(e) => this.handleTextFieldCreateUni(e)}
                        required={true}
                        type="text"
                        label="University"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={(e) => this.createAccount(e)}>
                        Create Account
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

