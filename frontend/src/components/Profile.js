import React, {Component} from 'react';
import API from "../utils/API";
import Workspace from "./Workspace";
import Works from "./Works";
import SubpagesLinks from "./SubpagesLinks";
import Picture from "./Picture";
import axios from "axios"


class Profile extends Component {
    state ={
        user:{},
        currentPage:"Default",//Default shows all their submitted works,
        profpic:''
    };

    // componentDidMount(){
    //     //The following function comes from folder utils' API.js.
    //     //I seperate it cuz I believe we need to load kids info on serveral differents pages
    // console.log("JuliaFun", this.props)
    //     API.loadUserInfo(this.props.match.params.id)
    //     .then(res => 
    //         this.setState({ user: res.data }))
    //     .catch(err => console.log(err));
    // };
    
    componentDidMount(){
      // console.log(this.props.match.params.id)
      axios.get("/api/users/upload/" + this.props.match.params.id)
      .then(res => {
          console.log(res);
          this.setState({ profpic: res.data.path })
          // this.setState({ profpic: res.data[0].path })
      }
      )
      .catch(err => console.log(err));    
    }

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
        } else if(this.state.currentPage ==="Profile Picture"){
          return <Picture id={this.props.match.params.id}/>;
        }
      };

      render() {
        return (
          <div>
          <div>
            {console.log(this.props.match.params.id)}
            <SubpagesLinks
              handlePageChange={this.handlePageChange}
            />
          </div>
          <img src={this.state.profpic} alt="profpic"/>
          <div>
          {this.renderPage()}
          </div>
          </div>
        );
      }
};

export default Profile;