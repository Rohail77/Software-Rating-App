import { Component } from 'react';
import { UserContext } from '../../../../../context/userContext';
import SigninLink from '../../../../common/signin link/SigninLink';
import SignoutLink from '../../../../common/signout link/SignoutLink';

class Account extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {user => {
          return (
            <div className='account'>
              {user.loggedin ? (
                <SignoutLink setLogin={user.setLogin} />
              ) : (
                <SigninLink from='/' />
              )}
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Account;
