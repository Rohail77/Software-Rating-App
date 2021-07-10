import { Component } from 'react';
import { Link } from 'react-router-dom';
import { authorization } from '../../gateway/auth/Authorization';

class SignoutLink extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    authorization.signout();
    const { setLogin } = this.props;
    setLogin(false);
  }

  render() {
    return (
      <Link className='signout-link' onClick={this.handleClick}>
        Sign out
      </Link>
    );
  }
}

export default SignoutLink;
