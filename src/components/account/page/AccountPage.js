import { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeLink from '../../common/home link/HomeLink';
import WaitMessage from '../../common/wait message/WaitMessage';
import DangerZone from './page components/danger zone/DangerZone';
import Forms from './page components/forms/Forms';

const waitMessageStyles = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

function AccountPage() {
  const [state, setState] = useState({
    onWait: false,
  });

  const wait = () =>
    setState({
      onWait: true,
    });

  const stopWait = () =>
    setState({
      onWait: false,
    });

  const { onWait } = state;

  return (
    <div className='wrapper account-wrapper'>
      <header>
        <div className='breadcrumbs'>
          <HomeLink />
          <span> \ </span>
          <Link className='page-link active-page-link' to='/account'>
            Account
          </Link>
        </div>
      </header>

      <Forms wait={wait} stopWait={stopWait} />

      <DangerZone wait={wait} stopWait={stopWait} />
      {onWait && <WaitMessage styles={waitMessageStyles} />}
    </div>
  );
}

export default AccountPage;
