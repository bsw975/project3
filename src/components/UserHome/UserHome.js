import React from "react";
import "./UserHome.css";
var l = console.log;

const UserHome = props => (
  <div className="container">

<div className="nav">
  <img src="../../../public/logo.png" />
  <span id="login-header">Login (kids/recruiters)</span>
  <span id="signup-header">Kids signup</span>
  <span id="about-header">About</span>
  <span id="contact-header">Contact</span>
</div>
<div>
  <h1 className="title">“You don’t have to be an adult to be successful”</h1>
  <div className="homepage-container">
    Series of pictures
    <img src="../../../public/promotion-1.png" />
    {/*processed JS content here*/}
  </div>
  <div className="promotion-container">
    <img src="../../../public/logo.png" />
    <img src="../../../public/logo.png" />
    <img src="../../../public/logo.png" />
    {/*processed JS content here*/}
  </div>
</div>
</div>
);

export default UserHome;