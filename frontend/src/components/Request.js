import React from 'react';
import "../App.css"

const Request = props => (
    <div className="request">
        <h1>{props.name}</h1>
        <h2>{props.email}</h2>
        <img style={{height:200,width:'auto'}}src={props.path} alt="stranger"/>
        <button onClick={() => props.handleAcceptFriend(props.id)}>Accept Friend</button>
        <button onClick={() => props.handleRejectFriend(props.id)}>Delete Request</button>
    </div>
)

export default Request;