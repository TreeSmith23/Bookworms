import Typography from "@material-ui/core/Typography";
import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const CoverResultItem = ({item}) => {
  return (
    <div className="CoverResultItem">
    <img src={item.image} />
    </div>
  );
}


export default CoverResultItem

