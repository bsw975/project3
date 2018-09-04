import React, {Component} from 'react';
import API from "../utils/API";
import Workspace from "./Workspace";
import Works from "./Works";
import SubpagesLinks from "./SubpagesLinks";


class Profile extends Component {
    state ={
        user:{},
        currentPage:"Default"//Default shows all their submitted works
    };

    componentDidMount(){
        //The following function comes from folder utils' API.js.
        //I seperate it cuz I believe we need to load kids info on serveral differents pages
    console.log("JuliaFun", this.props)
        API.loadUserInfo(this.props.match.params.id)
        .then(res => 
            this.setState({ user: res.data }))
        .catch(err => console.log(err));
    };
    
    handlePageChange = page => {
        this.setState({ currentPage: page });
      };
    
    renderPage = () => {
        if (this.state.currentPage === "Works") {
          return <Works id={this.state.user.id}/>;
        } else if (this.state.currentPage === "Workspace") {
          return <Workspace id={this.state.user.id}/>;
       // } else if (this.state.currentPage === "Friends") {
       //   return <Friends />;
       // } else {
        //  return <Chat />;
        }
      };

      render() {
        return (
          <div>
          <div>
            <SubpagesLinks
              handlePageChange={this.handlePageChange}
            />
          </div>
          <div>
          {this.renderPage()}
          </div>
          </div>
        );
      }
};

export default Profile;