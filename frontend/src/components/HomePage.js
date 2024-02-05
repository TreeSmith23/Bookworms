import React, { Component } from 'react';
import SearchResult from "./SearchResult";
import SignIn from "./SignIn";
import Profile from "./Profile";
import Checkout from "./Checkout";
import HomeSearch from "./HomeSearch"

import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
            <Routes>
                <Route path='/' element={<HomeSearch />}/>
                <Route path='/result' element={<SearchResult/>}/>
                <Route path='/signin' element={<SignIn />}/>
                <Route path='/profile' element={<Profile />}/>
                <Route path='/checkout' element={<Checkout />}/>

            </Routes>
        </Router>;
    }
}

