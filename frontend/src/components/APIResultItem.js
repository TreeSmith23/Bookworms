import Typography from "@material-ui/core/Typography";
import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const APIResultItem = ({item}) => {
  return (
    <div className="APIResultItem">
    
    <Grid container spacing = {8}>
        <Grid item xs={1}></Grid>

        <Grid item xs={3} align="left">
        <Typography component="p" variant="p">{item.avg}</Typography>
        </Grid>
        <Grid item xs={4} align="center">
        <Typography component="p" variant="p">{item.good}</Typography>
        </Grid>
        <Grid item xs={3} align="center">
        <Typography component="p" variant="p">{item.new}</Typography>
        </Grid>
        
    </Grid>
    </div>
  );
}


export default APIResultItem

