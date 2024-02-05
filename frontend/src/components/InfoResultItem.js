import Typography from "@material-ui/core/Typography";
import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const InfoResultItem = ({item}) => {
  return (
    <div className="InfoResultItem">
    
    <Grid container spacing = {6}>
        <Grid item xs={1}></Grid>

        <Grid item xs={3} align="center">
        <Typography component="p" variant="p">{item.isbn}</Typography>
        </Grid>
        <Grid item xs={4} align="center">
        <Typography component="p" variant="p">{item.name}</Typography>
        </Grid>
        <Grid item xs={3} align="center">
        <Typography component="p" variant="p">{item.writers}</Typography>
        </Grid>
        
    </Grid>
    </div>
  );
}


export default InfoResultItem


