import React, { Component } from 'react';
import './App.css';
import {Route} from "react-router-dom";
import axios from 'axios';
import UserList from "./components/UserList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    axios.get("http://localhost:8000/api/users")
    .then(response => {
      console.log(response.data)
      this.setState({users: response.data})})
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        Hey, check it out! gonna make some ROUTES
        <Route exact path="/" render={(props) => <UserList users={this.state.users} {...props}/>}/>
      </div>
    );
  }
}

export default App;
