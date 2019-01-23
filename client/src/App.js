import React from "react";
import { Segment } from "semantic-ui-react";
import { Route } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import UserList from "./components/UserList";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    token: null,
    error: null,
    users: null
  };

  componentDidMount() {
    const token = localStorage.getItem("auth");

    if (token) {
      this.getUsers(token);
      this.setState({
        isLoggedIn: true,
        token
      });
    }
  }

  getUsers = async token => {
    try {
      const users = await axios({
        url: `http://localhost:8000/api/protected/users`,
        headers: { authorization: token }
      });

      console.log(users);

      this.setState({
        users: users.data
      });
    } catch (err) {
      console.log(err);
      this.setState({
        isLoggedIn: false,
        token: null,
        error: err
      });
    }
  };

  authenticate = async (account, signup) => {
    const baseURL = `http://localhost:8000/api/`;

    try {
      const auth = await axios.post(
        `${baseURL}${signup ? "register" : "login"}`,
        account
      );

      localStorage.setItem("auth", auth.data.token);
      this.getUsers(auth.data.token);

      this.setState({
        isLoggedIn: true,
        token: auth.data.token,
        error: false
      });
    } catch (err) {
      console.log(err);
      this.setState({
        isLoggedIn: false,
        token: null,
        error: err
      });
    }
  };

  logout = () => {
    localStorage.removeItem("auth");
    this.setState({
      isLoggedIn: false,
      token: null,
      error: null,
      users: null
    });
  };

  render() {
    const { isLoggedIn, users } = this.state;

    return (
      <Segment
        style={{
          border: "none",
          boxShadow: "none"
        }}
      >
        <Navbar isLoggedIn={isLoggedIn} logout={this.logout} />
        <Route
          exact
          path="/"
          render={props => <Home {...props} isLoggedIn={isLoggedIn} />}
        />
        <Route
          exact
          path="/users"
          render={props => (
            <UserList {...props} users={users} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route
          exact
          path="/signup"
          render={props => (
            <AuthForm
              {...props}
              signup
              submit={this.authenticate}
              isLoggedIn={isLoggedIn}
            />
          )}
        />
        <Route
          exact
          path="/signin"
          render={props => (
            <AuthForm
              {...props}
              submit={this.authenticate}
              isLoggedIn={isLoggedIn}
            />
          )}
        />
      </Segment>
    );
  }
}

export default App;
