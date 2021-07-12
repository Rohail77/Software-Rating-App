import React, { Component, Fragment } from 'react';
import AccountOptions from './AccountOptions';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(event) {
    event.preventDefault();
    this.setState(state => ({
      dropdownOpen: !state.dropdownOpen,
    }));
  }

  render() {
    const { dropdownOpen } = this.state;

    return (
      <Fragment>
        <a className='account' href='a' onClick={this.toggleDropdown}>
          <div className='avatar-container'>
            <img src='/images/avatar.svg' alt='avatar' />
          </div>
          <img src='/images/down arrow.svg' alt='down arrrow' />
        </a>
        {dropdownOpen ? <AccountOptions /> : null}
      </Fragment>
    );
  }
}

export default Account;
