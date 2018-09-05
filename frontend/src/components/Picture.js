import React, { Component } from "react";
import axios from "axios"
// import "./Search.css"
// import friends from "./friends.json"
// import Result from "./Result"

class Picture extends Component {
    state = {
        file: "",
        profpic:"https://via.placeholder.com/300x300"
    }

    handleUpload = () => {
        // console.log(this.state.file)
        // debugger;
        var reader = new FileReader();
        reader.onload = (event) => {
            const content = reader.result;
            console.log(content)
            console.log("success")
            axios.post("/api/users/images", {image: content, id: this.props.id, type: this.state.file.type}
        )
        .then(res => {console.log(res);
             this.setState({profpic: res.data.path})
            })
        }
        reader.readAsDataURL(this.state.file) 
    }

    handleInputChange = event => {
        this.setState({
            file: event.target.files[0]
        });
    };

    // componentDidMount(){
    //     // console.log(this.props.match.params.id)
    //     axios.get("/api/users/upload/" + this.props.id)
    //     .then(res => {
    //         console.log(res);
    //         this.setState({ profpic: res.data.path })
    //         // this.setState({ profpic: res.data[0].path })
    //     }
    //     )
    //     .catch(err => console.log(err));    
    //   }

    render() {
        return (
            <div>
                {console.log(this.props.id)}
                
                <input type="file" onChange={this.handleInputChange} />
                <button onClick={this.handleUpload}>Upload</button>
            </div>
        );
    }
}

export default Picture;
