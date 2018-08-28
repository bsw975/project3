// Home.js

import React, { Component } from 'react';
import { addFriend } from '../actions/addFriend';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home Component</h1>
                <h4><a href="AddFriend">Add friends</a></h4>
                <form onSubmit={ this.handleSubmit }>
                    <input placeholder="Friend's email" name="email"/>
                </form>
            </div>
        );
    }
}