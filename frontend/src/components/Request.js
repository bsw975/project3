import React from 'react';

const Request = props => (
    <div>
        <h1>{props.name}</h1>
        <h2>{props.email}</h2>
        <button onClick={() => props.handleAcceptFriend(props.id)}>Accept Friend</button>
        <button onClick={props.handleDeleteRequest}>Delete Request</button>
    </div>
)

export default Request;