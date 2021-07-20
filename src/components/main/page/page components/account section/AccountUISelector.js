import { Fragment } from 'react';
import SigninLink from '../../../../common/signin link/SigninLink';
import { user } from '../../../../../database/User';
import Account from './account/Account';

function AccountUISelector() {
  return (
    <Fragment>
      {user.isSignedin() ? <Account /> : <SigninLink from='/' />}
    </Fragment>
  );
}

export default AccountUISelector;
