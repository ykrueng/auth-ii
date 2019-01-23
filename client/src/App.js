import React from "react";
import { Segment, Header } from "semantic-ui-react";
import { Route } from "react-router-dom";
import axios from "axios";

import AuthForm from "./components/AuthForm";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    token: null,
    error: null,
  };

  authenticate = async (account, signup) => {
    const baseURL = `http://localhost:8000/api/`;

    try {
      const auth = await axios.post(
        `${baseURL}${signup ? 'register' : 'login'}`,
        account
      );

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
    const { isLoggedIn } = this.state;
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
