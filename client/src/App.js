import React from "react";
import { Segment, Header, Card } from "semantic-ui-react";
import { Route } from "react-router-dom";
import axios from "axios";

import AuthForm from "./components/AuthForm";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    token: null,
    error: null,
    users: null,
  };

  getUsers = async (token) => {
    try {
      const users = await axios({
        url: `http://localhost:8000/api/protected/users`,
        headers: { authorization: token }
      });

      this.setState({
        users: users.data
      })

    } catch (err) {
      console.log(err);
      this.setState({
        isLoggedIn: false,
        token: null,
        error: err,
      })
    }
  }

  authenticate = async (account, signup) => {
    const baseURL = `http://localhost:8000/api/`;

    try {
      const auth = await axios.post(
        `${baseURL}${signup ? 'register' : 'login'}`,
        account
      );

      this.getUsers(auth.data.token);

      this.setState({
        isLoggedIn: true,
        token: auth.data.token,
        error: false,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        isLoggedIn: false,
        token: null,
        error: err,
      });
    }
  }

  render() {
    const { isLoggedIn, users } = this.state;
    return (
      <Segment
        style={{
          border: "none",
          boxShadow: "none"
        }}
      >
        <Header as="h1" textAlign="center">
          Welcome to Auth-II
        </Header>
        {
          users &&
          users.map(user => (
            <Card key={user.id}>{user.username}</Card>
          ))
        }
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
