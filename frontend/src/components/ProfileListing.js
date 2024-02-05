import Typography from "@material-ui/core/Typography";
import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const ProfileListing = ({item}) => {
  return (
    <div className="profileListing">
    
    <Grid container spacing = {10}>
        <Grid item xs={1}></Grid>
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
        
    </Grid>
    </div>
  );
}


export default ProfileListing
