import React from "react";
import { Segment, Header, Card, Button } from "semantic-ui-react";
import { Route, Link } from "react-router-dom";
import axios from "axios";

import AuthForm from "./components/AuthForm";
import UserList from "./components/UserList";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    token: null,
    error: null,
    users: null,
  };

  componentDidMount() {
    const token = localStorage.getItem('auth');

    if (token) {
      this.getUsers(token);
      this.setState({
        isLoggedIn: true,
        token
      })
    }
  }

  getUsers = async (token) => {
    try {
      const users = await axios({
        url: `http://localhost:8000/api/protected/users`,
        headers: { authorization: token }
      });

      console.log(users);

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

      localStorage.setItem('auth', auth.data.token);
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
    console.log(isLoggedIn);
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
          !isLoggedIn &&
          <Segment textAlign="center">
            <Button
              content={<Link to='/signup'>Sign Up</Link>}
            />
            <Button
              content={<Link to='/signin'>Sign In</Link>}
            />
          </Segment>
        }
        <Route exact path='/users' render={props => (
          <UserList {...props} users={users}/>
        )}/>
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
