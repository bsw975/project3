import React from 'react';

const Friend = props => (
    <div style={{float:"left", marginLeft:"20px"}}>
        <h2>{props.name}</h2>
        <img style={{height:200,width:'auto'}}src={props.path} alt="silhouette"/>
    </div>
)

export default Friend;