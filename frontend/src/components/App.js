import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { useState } from 'react'

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    App() {
        const Results = () => {
            const [results, getResults] = useState([
                {
                    isbn: 0,
                    name: 'Calculus 1',
                    location: 'College Station, TX',
                    condition: 'used',
                    price: 22.49,
            
                },
                {
                    isbn: 1,
                    name: 'Programming Languages',
                    location: 'Houston, TX',
                    condition: 'used',
                    price: 19.99,
            
                },
                {
                    isbn: 2,
                    name: 'How to Exit Vim',
                    location: 'San Jose, CA',
                    condition: 'used',
                    price: 179.99,
            
                }]
            )
        }
    }
    render() {
        return (
            <div style= {{overflow: "scroll", height: "100vh"}}>
                <HomePage  /*results={results}*//>
            </div>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'