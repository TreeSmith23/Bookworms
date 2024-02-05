import Typography from "@material-ui/core/Typography";
import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import restClient from "../API";




const SearchResultItem = ({item}) => {
  function changePage(seller){
    sessionStorage.setItem("itemSeller", seller);
    console.log(sessionStorage.getItem("itemSeller"));
    console.log(sessionStorage.getItem("userName"));
    findUser();
    //window.location.replace("/checkout");
  }
  
  function findUser(event){

    restClient.get('getUserData/?userName='+sessionStorage.getItem("itemSeller")+'')
    .then((response) =>{
        //console.log("this->>>" + response);
        sessionStorage.setItem("sellerData", JSON.stringify(response.data));
        window.location.replace("/checkout");
    })

}


  return (
    <div className="searchResultItem">
    <Grid container spacing = {10}>
        <Grid item xs={2}></Grid>

        <Grid item xs={2} align="center">
        <Typography component="p" variant="p">{item.title}</Typography>
        </Grid>
        <Grid item xs={2} align="center">
        <Typography component="p" variant="p">{item.sellingPrice}</Typography>
        </Grid>
        <Grid item xs={2} align="center">
        <Typography component="p" variant="p">{item.seller}</Typography>
        </Grid>
        <Grid item xs={2} align="center">
        <Button variant="outlined" onClick={() => changePage(item.seller)} >Buy</ Button>
        </Grid>
        
    </Grid>
    </div>
  );
}


export default SearchResultItem

