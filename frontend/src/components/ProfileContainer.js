import React, { Component } from "react";
import ProfileBox from './ProfileBox/ProfileBox'
import SubBoxes from './SubBoxes/SubBoxes'
import axios from "axios"
import fs from 'fs'

class ProfileContainer extends Component {
    state={
        profpic: "",
    }


    componentDidMount(){
        // console.log(this.props.match.params.id)
        axios.get("/api/users/upload/" + this.props.match.params.id)
        .then(res => {
            console.log(res);
                this.setState({ profpic: res.data.path })
            }
        )
        .catch(err => console.log(err));    
      }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <ProfileBox id={this.props.match.params.id} profpic={this.state.profpic} />
                            <SubBoxes />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProfileContainer