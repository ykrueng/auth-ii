import React from "react";
import { Segment, Header, Form, Button, Divider } from "semantic-ui-react";

class AuthForm extends React.Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  componentWillReceiveProps(props) {
    props.isLoggedIn && this.props.history.push('/users')
  }

  handleTextInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async(e) => {
    e.preventDefault();

    const { username, password, department } = this.state;
    const { signup, submit } = this.props;

    const account = { username, password };
    if (signup) account.department = department;

    submit(account, signup);
    this.setState({
      username: '',
      password: '',
      department: ''
    })
  }

  render() {
    const { username, password, department } = this.state;
    const { signup } = this.props;
    return (
      <Segment
        style={{
          maxWidth: "400px",
          margin: "0 auto"
        }}
      >
        <Header as="h2" textAlign="center">
          {signup ? 'Sign Up Form' : 'Sign In Form'}
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
          {
            signup && 
            <Form.Input
              name="department"
              value={department}
              onChange={this.handleTextInput}
              placeholder="Enter department"
              label="Department"
            />
          }
          <Button
            fluid
            color="linkedin"
            icon={signup ? "signup" : 'sign-in'}
            content={signup ? "Create Account" : 'Log In'}
            type="submit"
          />
          <Divider />
          <p>
            {signup ? 'Already Have an Account?' : "Don't Have an Account?"}
          </p>
          <Button
            style={{
              marginTop: '20px'
            }}
            fluid
            color="linkedin"
            icon={signup ? "sign-in" : 'signup'}
            content={signup ? "Sign In" : "Create an Accout"}
            onClick={() => this.props.history.push(signup? '/signin' : '/signup')}
          />
        </Form>
      </Segment>
    );
  }
}

export default AuthForm;
