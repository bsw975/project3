import React, { Component } from 'react';
import axio from 'axios';


import S3FileUpload from 'react-s3';

const config = {
    bucketName: 'kidsworkspacedb',
    dirName: 'photos',
    region: 'us-east-1',
    accessKeyId: 'AKIAI464P6ZSKUISHTOA',
    secretAccessKey: 'r7YYb5++uwaVm7M9s2BKJfYVL/uBCqxapr/aqep1',
}

class Workspace extends Component {
    state = {
        imgSrc:"https://via.placeholder.com/300x300"
    };

    upload = e =>{
        console.log(e.target.files[0])
        S3FileUpload .upload(e.target.files[0], config)
            .then(data => {
                console.log(data.location);
                this.setState({imgSrc:data.location});})
                //data is a json object looks like the following:
                /**
        * {
        *   Response: {
        *     bucket: "bucket-name",
        *     key: "photos/image.jpg",
        *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
        *   }
        * }
        */  
       
    };

    addToDB = e =>{
        axio.post("/upload"+this.props.id,this.state.imgSrc)
    };

    render() {
        return (
            <div>
                <img src={this.state.imgSrc}/>
                
                <input type="file" onChange={this.upload} />
                <input type ="submit" onSubmit = {this.addToDB}/>
            </div>
        );
    }
}

export default Workspace;