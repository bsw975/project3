import React, { Component } from "react";
import "./ProfileBox.css";
import store from "../../store";
import Picture from "../Picture";
import SubProfileLinks from "../SubProfileLinks"
import FriendList from "../FriendList";


class ProfileBox extends Component {
    state = {
        currentPage:"Default"//Default shows all their submitted works,
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
      };
    
    renderPage = () => {
        if (this.state.currentPage === "FriendList") {
          return <FriendList />;
        } else if (this.state.currentPage === "Change Picture") {
          return <Picture id={this.props.id}/>;
        }
      };

    render() {
        return (

            <div id="profileBox" className="col-lg-3">
                <div id="profilePic">
                    <center><img style={{height:"155px",width:"auto"}}src={this.props.profpic} /></center>
                </div>
                {console.log(store.getState())}
                <h1 id="name">{store.getState().auth.user.name}</h1>
                <p className="text-muted" id="userTag">@{store.getState().auth.user.id}</p>
                <hr />
                <h5 id="quote"><i />"Don't let what you cannot do interfere with what you can do"  -John Wooden</h5>
                <hr />
                {/* <p><img id="schoolLogo" src="https://1.cdn.edl.io/sLbGF6TWm4ES4wOFBV6U8yNBzJYmRe1R4daurRq14c752HUC.jpg" /> Peachtree Ridge High School</p>
                    <p>Class of 2021</p>
                    <hr /> */}
                <p><img id="locationLogo" src="/svg/location.svg" /> Suwannee, GA, United States of America</p>
                <hr />
                {/* <p><a href="/"><img id="friendLogo" src="/svg/organization.svg" />  See Friends</a></p> */}
                <SubProfileLinks
                    handlePageChange={this.handlePageChange}
                />
                {this.renderPage()}
            </div>

        )
    }
}


export default ProfileBox