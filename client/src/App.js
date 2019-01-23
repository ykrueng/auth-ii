import React from "react";
import { Segment, Header } from "semantic-ui-react";
import { Route } from "react-router-dom";
import axios from "axios";

import SignupForm from "./components/SignupForm";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    token: null,
    error: null,
  };

  register = async account => {
    try {
      const auth = await axios.post(
        "http://localhost:8000/api/register",
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
  };
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
            <SignupForm
              {...props}
              register={this.register}
              isLoggedIn={isLoggedIn}
            />
          )}
        />
      </Segment>
    );
  }
}

export default App;
