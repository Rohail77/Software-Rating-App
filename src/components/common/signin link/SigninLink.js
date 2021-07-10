import { Component } from 'react';
import { Link } from 'react-router-dom';

class SigninLink extends Component {
  render() {
    const { from } = this.props;

    return (
      <Link
        className='signin-link'
        to={{ pathname: '/signin', state: { from } }}
      >
        Sign in
      </Link>
    );
  }
}

export default SigninLink;
