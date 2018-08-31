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
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    user: null
  }

  componentWillMount () {
    if(localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      store.dispatch(setCurrentUser(decoded));
    
      const currentTime = Date.now() / 1000;
      if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
      }

      // EXAMPLE ONLY of storing user data in state
      // would have to consider removing from state after logging out
      axios.get("/api/users/me").then(res => this.setState({ user: res.data }));
    }
  }

  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
              {this.state.user==null ? null: <Route exact path="/" render = {(props) => <Home state={this.state}/>} />}
              {console.log(this.state.user)}
                {/* <Route exact path="/" render = {(props) => <Home state={this.state}/>} /> */}
                
                <div className="container">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/profile/:id" component={Profile} />
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;