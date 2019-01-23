import React from 'react';
import { Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
  return (
    <Segment textAlign="center">
    <Header as="h1" textAlign="center">
      Welcome to Auth-II
    </Header>
    {
      !isLoggedIn &&
      <>
        <Button
          content={<Link to='/signin'>Sign In</Link>}
        />
        <Button
          content={<Link to='/signup'>Sign Up</Link>}
        />
      </>
    }
    </Segment>
  );
}
 
export default Home;