import { Fragment } from 'react';
import SigninLink from '../../../../common/signin link/SigninLink';
import Account from './account/Account';
import { useSelector } from 'react-redux';

function AccountUISelector() {
  const loggedin = useSelector(state => state.loggedin);

  return (
    <Fragment>{loggedin ? <Account /> : <SigninLink from='/' />}</Fragment>
  );
}

export default AccountUISelector;
