import React, { Component } from 'react';
// import { addFriend } from '../actions/addFriend';
import axios from 'axios';
import Request from './Request'
import { get } from 'http';
// const User = require('../models/User');
import Friend from './Friend';
import "./Home.css";


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
        const friendsToBe = {
            requestor: this.props.state.user,
            requestee: this.state.email
        }
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
        const duo =
         {
            requestor: id,
            acceptor: this.props.state.user.id
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
            console.log(data)
            this.setState({friends: data.data.Friends})
        })
    }

    componentDidMount(){
        // console.log(this.props.state);
        this.getRequests(this.props.state.user)
        this.getFriends(this.props.state.user)
    }

    render() {
        return (
            <div>
                <br />
                <center><h1>Welcome back {this.props.state.user.name}!</h1></center>
                <div className='row'>
                <div className='col-lg-12'>
                <div className='row'>
                <div className='col-lg-6'>
                <img src='https://www.pngarts.com/files/2/Positive-Quotes-PNG-Background-Image.png' />
                </div>
                <div id='friends' className='col-log-6'>
                <h4><a href="AddFriend">Add friends</a></h4>
                    <input onChange={this.handleInput} value={this.state.email}placeholder="Friend's email" name="email"/>
                    <button onClick={this.handleAddFriend}>Add Friend</button>
                {/* <h5><a href="FriendRequests">Accept friend requests</a></h5> */}
                <h3>Pending Friend Requests:</h3>
                {/* <button onClick={() => this.getRequests(this.props.state.user)}>Click to see friend requests</button> */}
                {/* {this.props.state.user.FriendRequestedBy} */}
                {this.state.friendRequests.length>0 ? this.state.friendRequests.map((request,index) => (
                    <Request
                    key={index}
                    email={request.email}
                    name={request.name}
                    handleAcceptFriend={this.handleAcceptFriend}
                    id={request._id}
                    />
                )): null}
                {/* {this.state.friendRequests.map((request,index) => (
                    <Request
                    key={index}
                    email={request.email}
                    name={request.name}
                    />
                ))} */}
                <h3>My Friends:</h3>
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
                    />
                ))}
                </div>
                </div>
                </div>
                </div>
                
                

            </div>
        );
    }
}

