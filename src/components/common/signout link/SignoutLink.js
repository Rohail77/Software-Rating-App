import { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import { authorization } from '../../gateway/auth/Authorization';

class SignoutLink extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(cb) {
    authorization.signout();
    cb(false);
  }

  render() {
    return (
      <UserContext.Consumer>
        {user => (
          <Link
            className='signout-link'
            onClick={event => {
              event.preventDefault();
              this.handleClick(user.setLogin);
            }}
            to='/'
          >
            <img src='/images/signout.svg' alt='signout' />
            <span>Signout</span>
          </Link>
        )}
      </UserContext.Consumer>
    );
  }
}

export default SignoutLink;
