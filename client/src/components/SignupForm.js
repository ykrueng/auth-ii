import React from "react";
import { Segment, Header, Form, Button } from "semantic-ui-react";

class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  componentWillReceiveProps(props) {
    props.isLoggedIn && this.props.history.push('/')
  }

  handleTextInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async(e) => {
    e.preventDefault();

    const account = this.state;
    this.props.register(account);
    this.setState({
      username: '',
      password: '',
      department: ''
    })
  }

  render() {
    const { username, password, department } = this.state;
    return (
      <Segment
        style={{
          maxWidth: "400px",
          margin: "0 auto"
        }}
      >
        <Header as="h2" textAlign="center">
          Sign Up Form
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="username"
            value={username}
            onChange={this.handleTextInput}
            placeholder="Enter username"
            label="Username"
          />
          <Form.Input
            name="password"
            value={password}
            onChange={this.handleTextInput}
            placeholder="Enter password"
            label="Password"
            type="password"
          />
          <Form.Input
            name="department"
            value={department}
            onChange={this.handleTextInput}
            placeholder="Enter department"
            label="Department"
          />
          <Button
            fluid
            color="linkedin"
            icon="signup"
            content="Create Account"
            type="submit"
          />
        </Form>
      </Segment>
    );
  }
}

export default SignupForm;
