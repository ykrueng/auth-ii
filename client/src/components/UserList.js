import React from 'react';
import { Card, Image } from 'semantic-ui-react';

class UserList extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('auth');

    if (!token) {
      this.props.history.push('/signin');
    }
  }

  componentWillReceiveProps(props) {
    if (!props.isLoggedIn) {
      this.props.history.push('/signin');
    }
  }

  render() {
    const { users } = this.props;
    return (
      <Card.Group
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {
          users && users.map(user => (
            <Card key={user.id}>
              <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
              <Card.Content>
                <Card.Header>{user.username}</Card.Header>
                <Card.Meta>
                  <span className='date'>{user.department}</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))
        }
      </Card.Group>
    );
  }
}
 
export default UserList;