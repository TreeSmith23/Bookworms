import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import SearchResultItem from './SearchResultItem';
import APIResultItem from './APIResultItem';
import CoverResultItem from './CoverResultItem';
import InfoResultItem from './InfoResultItem';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useState } from 'react'
import Button from "@material-ui/core/Button";

import Select from 'react-select'

const options = [
  { label: 'Selling Price: low to high', value: 'l2h' },
  { label: 'Selling Price: high to low', value: 'h2l' }
]

const backHome = () => {
    window.location.replace("/");
}
//https://medium.com/@asadise/sorting-a-json-array-according-one-property-in-javascript-18b1d22cd9e9
function sortByPriceLow2High(property){  
    return function(a,b){  
       if(parseFloat(a[property]) > parseFloat(b[property]))  
          return 1;  
       else if(parseFloat(a[property]) < parseFloat(b[property]))  
          return -1;  
   
       return 0;  
    }  
 }
 function sortByPriceHigh2Low(property){  
    return function(a,b){  
       if(parseFloat(a[property]) < parseFloat(b[property]))  
          return 1;  
       else if(parseFloat(a[property]) > parseFloat(b[property]))  
          return -1;  
   
       return 0;  
    }  
 }
let selectedOption = '';
//let lookup = [];
const SearchResult = () => {
    const [lookup, setLookup] = useState(JSON.parse(sessionStorage.getItem("lookup")).data);
    console.log("lookup: ")
    console.log(lookup)
    

    const handleChange = (selectedOption) => {
        setLookup([])
        console.log(`Option selected:`, selectedOption);
        if(selectedOption.value=='l2h'){
            console.log("l2h");
            setLookup(JSON.parse(sessionStorage.getItem("lookup")).data.sort(sortByPriceLow2High("sellingPrice")));
        }
        if(selectedOption.value=='h2l'){
            console.log("h2l");
            setLookup(JSON.parse(sessionStorage.getItem("lookup")).data.sort(sortByPriceHigh2Low("sellingPrice")));
        }
        console.log('dgsdfsa');
        console.log(lookup);
        //setLookup([]);
        //setLookup(lookup.sort(sortByPriceHigh2Low("sellingPrice")));
    };

    return(<>
        <Grid item  
            direction="column"
            alignItems="flex-end"
            justifyContent="flex-start">
            <Button color="primary" variant="contained" onClick={() => backHome()}>Home</Button>
        </Grid>
        <Typography component="h4" variant="h4" align="center">Search Results</Typography>
        
        <div style={{border: "2px solid black", margin:"2em"}}>

            <Typography component="h5" variant="h5">Book Information</Typography>

            <Grid container spacing={1}>
                {JSON.parse(sessionStorage.getItem("cover")).url.map((item) => (
                    <Grid item xs={12} align="center">
                        <CoverResultItem item={item} />
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={2} align="center">
                <Typography component="h5" variant="h5">{'ISBN'}</Typography>
                </Grid>
                <Grid item xs={2} align="center">
                <Typography component="h5" variant="h5">{'Book Title'}</Typography>
                </Grid>
                <Grid item xs={2} align="center">
                <Typography component="h5" variant="h5">{'Authors'}</Typography>
                </Grid>
                <Grid item xs={2} align="center">
                <Typography component="h5" variant="h5">{'Average Price'}</Typography>
                </Grid>
                <Grid item xs={2} align="center">
                <Typography component="h5" variant="h5">{'Good Price'}</Typography>
                </Grid>
                <Grid item xs={2} align="center">
                <Typography component="h5" variant="h5">{'New Price'}</Typography>
                </Grid>

                {JSON.parse(sessionStorage.getItem("info")).data.map((item) => (
                    <Grid item xs={6} align="center">
                        <InfoResultItem item={item} />
                    </Grid>
                ))}
                {JSON.parse(sessionStorage.getItem("pricing")).data.map((item) => (
                    <Grid item xs={6} align="center">
                        <APIResultItem item={item} />
                    </Grid>
                ))}

            </Grid>
        </div>
        <Select options={options}  value={selectedOption} onChange={handleChange}/>
                    
        <Grid container spacing={1}>
            
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

            {lookup.map((item) => (
                <Grid item xs={12} align="center">
                    <SearchResultItem item={item} />
                </Grid>
            ))}
        </Grid>
        
        
        </>);
}

export default SearchResult