import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignoutLink from '../../../../../common/signout link/SignoutLink';

class AccountOptions extends Component {
  render() {
    return (
      <ul className='account__options'>
        <li>
          <a href='a' className='account__option'>
            Your account
          </a>
        </li>
        <li>
          <Link className='account__option' to='/reviews_history'>
            Your ratings
          </Link>
        </li>
        <li>
          <SignoutLink />
        </li>
      </ul>
    );
  }
}

export default AccountOptions;
