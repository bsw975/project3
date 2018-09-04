import React from 'react';

const Friend = props => (
    <div>
        <h1>{props.name}</h1>
        <img style={{height:200,width:'auto'}}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG2HfGDb5ru_KH5Uv5a0HJtub0dVlUCXynWOC1D7mqsmTyPtOE9Q" alt="silhouette"/>
    </div>
)

export default Friend;