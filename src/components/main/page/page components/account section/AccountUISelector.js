import { Component, Fragment } from 'react';
import { UserContext } from '../../../../../context/userContext';
import SigninLink from '../../../../common/signin link/SigninLink';
import Account from './account/Account';

class AccountUISelector extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {user => {
          return (
            <Fragment>
              {user.loggedin ? <Account /> : <SigninLink from='/' />}
            </Fragment>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default AccountUISelector;
