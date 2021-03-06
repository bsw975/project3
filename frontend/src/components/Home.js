import React, { Component } from 'react';
// import { addFriend } from '../actions/addFriend';
import axios from 'axios';
import Request from './Request'
import { get } from 'http';
// const User = require('../models/User');
import Friend from './Friend'
import store from "../store";

export default class Home extends Component {
    state={
        email: "",
        friendRequests: [],
        friends: []
    }

    handleInput = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }
    
    handleAddFriend = () => {
        const {user} = store.getState().auth;
        const friendsToBe = {
            requestor: user,
            requestee: this.state.email
        }
        this.refs.emailInput.value = '';

        axios.post('/api/users/AddFriend', friendsToBe)
        // .then(data => {
        //     this.setState({friendRequests: data.data.FriendRequestedBy});console.log(data);console.log(this.state.friendRequests)
        // })
        .then(console.log)

        // addFriend(friendsToBe) // TODO: understand why this is NOT this. props. addFriend
    }
    
    getRequests = (user) => {
        // const anything = this.props
        // console.log(anything)
        axios.post("/api/users/FriendRequests",user).then(data => {
            this.setState({friendRequests: data.data.FriendRequestedBy});console.log(data);console.log(this.state.friendRequests)
        })
    }

    handleAcceptFriend = (id) => {
        const { user } = store.getState().auth;
        const duo =
         {
            requestor: id,
            acceptor: user.id
        }
        axios.post("/api/users/AcceptFriend", duo)
        .then(data=> {
            this.setState({friends: data.data.Friends})
            return axios.post('/api/users/DeleteRequest',duo)
        }).then(data=> {
            this.setState({friendRequests: data.data.FriendRequestedBy});
        })
        
        // .then(data=> {
        //     console.log(data)
        //     this.setState({friends: data.data.Friends})
        // })
        // .then(console.log)
    }

    handleRejectFriend = (id) => {
        const { user } = store.getState().auth;
        const duo =
         {
            requestor: id,
            rejector: user.id
        }
        axios.post("/api/users/DeleteFriendRequest", duo)
        .then(data=> {
            this.setState({friendRequests: data.data.FriendRequestedBy})
        })
    }

    // handleBlogPost = (id) => {
    //     const postObject =
    //      {
    //         id: id,
    //         acceptor: this.props.state.user.id
    //     }
    //     axios.post("/api/users/BlogPosts", duo)
    //     .then(data=> {
    //         this.setState({friends: data.data.Friends})
    //         return axios.post('/api/users/DeleteRequest',duo)
    //     }).then(data=> {
    //         this.setState({friendRequests: data.data.FriendRequestedBy});
    //     })
        
    //     // .then(data=> {
    //     //     console.log(data)
    //     //     this.setState({friends: data.data.Friends})
    //     // })
    //     // .then(console.log)
    // }

    getFriends = (user) => {
        axios.post("/api/users/Friends", user).then(data=> {
            this.setState({friends: data.data.Friends})
        })
    }

    componentDidMount(){
        const { user } = store.getState().auth;
        this.getRequests(user)
        this.getFriends(user)
    }

    render() {
        const {user} = store.getState().auth;
        return (
            <div>
                <h1>Home Component</h1>
                <h2>User logged in:</h2>
                {/* <h1>{JSON.stringify(this.props.state.user)}</h1> */}
                <h3>{JSON.stringify(store.getState().auth.user)}</h3>
                <h2>Welcome, {store.getState().auth.user.name}!</h2>
                <h4><a href={`/profile/${store.getState().auth.user.id}`}>Go to your profile</a></h4>
                    <input onChange={this.handleInput} value={this.state.email}placeholder="Friend's email" name="email" ref="emailInput"/>
                    <button onClick={this.handleAddFriend}>Add Friend</button>
                {/* <h5><a href="FriendRequests">Accept friend requests</a></h5> */}
                <h5>Pending Friend Requests:</h5>
                {/* <button onClick={() => this.getRequests(user)}>Click to see friend requests</button> */}
                {/* {user.FriendRequestedBy} */}
                {this.state.friendRequests.length>0 ? this.state.friendRequests.map((request,index) => (
                    <Request
                    key={index}
                    email={request.email}
                    name={request.name}
                    handleAcceptFriend={this.handleAcceptFriend}
                    handleRejectFriend={this.handleRejectFriend}
                    id={request._id}
                    path={request.path}
                    />
                )): null}
                {/* {this.state.friendRequests.map((request,index) => (
                    <Request
                    key={index}
                    email={request.email}
                    name={request.name}
                    />
                ))} */}
                <h5>My Friends</h5>
                {/* {this.state.friends.length>0 ? this.state.friends.map((friend,index) => (
                    <Friend
                    key={index}
                    name={friend.name}
                    />
                )): null} */}
                {this.state.friends.map((friend,index) => (
                    <Friend
                    key={index}
                    name={friend.name}
                    path={friend.path}
                    />
                ))}
            </div>
        );
    }
}

