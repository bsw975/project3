import React from "react";
import store from "../store";


//this component should render all workpics for the login user

const FriendList = (props) => (
  <div style={{overflow:"scroll"}}>
    <h3>Friends</h3>
    {/* {console.log(store.getState().auth)} */}
    {console.log(props.friends)}
    <ul style={{height:"100px",overflow:"scroll"}}>
    {props.friends.map((friend) => (
                    <li key={friend._id}><img style={{height:20}} src={friend.path} alt="friend"/><p><a href={`/profile/${friend._id}`}>{friend.name}</a> : {friend.email}</p></li>
                ))}
    </ul>
    
  </div>
);

export default FriendList;
