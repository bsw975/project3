// Home.js

import React, { Component } from 'react';
import { addFriend } from '../actions/addFriend';
import axios from 'axios';
import Request from './Request'
import { get } from 'http';
// const User = require('../models/User');


export default class Home extends Component {
    state={
        email: "",
        friendRequests: []
    }

    handleInput = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }
    
    handleAddFriend = () => {
        const friendsToBe = {
            requestor: this.props.state.user,
            requestee: this.state.email
        }
        axios.post('/api/users/AddFriend', friendsToBe).then(console.log)

        // addFriend(friendsToBe) // TODO: understand why this is NOT this. props. addFriend
    }

    getFriendRequests = (user) => {
        // return from the DB search, the array of friend requests for the logged-in user
    }
    getRequests = (user) => {
        // const anything = this.props
        // console.log(anything)
        axios.post("/api/users/FriendRequests",user).then(data => {
            this.setState({friendRequests: data});console.log(data)
        })
    }
    componentDidMount(){
        console.log(this.props.state);
    }

    render() {
        return (
            <div>
                <h1>Home Component</h1>
                <h2>User logged in:</h2>
                {/* <h1>{JSON.stringify(this.props.state.user)}</h1> */}
                <h3>{console.log(this.props.state) }</h3>
                <h3>{JSON.stringify(this.props.state.user)}</h3>
                <h4><a href="AddFriend">Add friends</a></h4>
                    <input onChange={this.handleInput} value={this.state.email}placeholder="Friend's email" name="email"/>
                    <button onClick={this.handleAddFriend}>Add Friend</button>
                <h5><a href="FriendRequests">Accept friend requests</a></h5>
                <button onClick={() => this.getRequests(this.props.state.user)}>Click to see friend requests</button>
                {/* {this.props.state.user.FriendRequestedBy} */}
                {/* {this.state.friendRequests.map(request => {
                    <Request
                    email={request.email}
                    name={request.name}
                    />
                })} */}
            </div>
                //this.props.state.user.wantedby.map( user => { <FriendRequest email={user.email} picture={user.profpic}  /> } )
        );
    }
}

