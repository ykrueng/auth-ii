import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

class App extends React.Component {
  render() {
    return (
      <Segment style={{
        border: "none",
        boxShadow: "none"
      }}>
        <Header as="h1" textAlign="center">
          Welcome to Auth-II
        </Header>
      </Segment>
    )
  }
}

export default App;