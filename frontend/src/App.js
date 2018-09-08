// App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import axios from "axios";
import Navbar from './components/Navbar';
import ProfileNav from './components/ProfileNav/ProfileNav'
import Register from './components/Register';
import Login from './components/Login';
import HomeContainer from './components/HomeContainer';
import Profile from './components/Profile';
import Slideshow from './components/Slideshow';
import ProfileContainer from "./components/ProfileContainer"

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor () {
    super();
    if(localStorage.getItem("jwtToken")) {
      setAuthToken(localStorage.getItem("jwtToken"));
      const decoded = jwt_decode(localStorage.getItem("jwtToken"));
      store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
            <div>
            <Navbar />
                  <Route exact path="/" component={HomeContainer} />
              {/* {this.state.user==null ? <Route exact path="/" component={ Slideshow }/>: <Route exact path="/" render = {(props) => <Home state={this.state}/>} />} */}
                {/* <Route exact path="/" render = {(props) => <Home state={this.state}/>} /> */}
                {/* <div className="container"> */}
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/upload/:id" component={ Profile } />
                  <Route exact path="/profile/:id" component={ ProfileContainer } />
                {/* </div> */}
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;