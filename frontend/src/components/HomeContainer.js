import React, { Component } from 'react';
import store from "../store";
import Home from './Home';
import Slideshow from './Slideshow';

export default class HomeContainer extends Component {
    render() {
        const { isAuthenticated } = store.getState().auth;
        return isAuthenticated ? <Home /> : <Slideshow />;
    }
}

