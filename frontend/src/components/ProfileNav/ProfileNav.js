import React from "react";
import "./ProfileNav.css";

const ProfileNav = () => (
    <nav className="navbar navbar-expand-lg">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse nav-text" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">JunTal</a>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <a id="network" className="nav-link" href="#"><img id="networkLogo" src="./svg/globe.svg" />  Network <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#"><img id="messageLogo" src="./svg/comment-discussion.svg" /> Messaging</a>
                </li>
               
            </ul>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Find Friends" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
)

export default ProfileNav;