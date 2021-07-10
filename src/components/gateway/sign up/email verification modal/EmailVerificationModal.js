import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmailVerificationModal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const { isEmailVerified } = this.props;
    isEmailVerified();
  }

  render() {
    const { email } = this.props;

    return (
      <div className='email-verification-modal-wrapper'>
        <section className='email-verification-modal'>
          <p>
            We sent a verfication email to {email}. After verification, click
            the button below to sign in.
          </p>
          {/* <a href='verify' onClick={this.handleClick}>
            I have Verified{' '}
          </a> */}
          <Link to='/signin'>I have Verified </Link>
        </section>
      </div>
    );
  }
}

export default EmailVerificationModal;
