import { Fragment } from 'react';
import SigninLink from '../../../../common/signin link/SigninLink';
import { signedin } from '../../../../../database/User';
import Account from './account/Account';

function AccountUISelector() {
  return (
    <Fragment>{signedin() ? <Account /> : <SigninLink from='/' />}</Fragment>
  );
}

export default AccountUISelector;
