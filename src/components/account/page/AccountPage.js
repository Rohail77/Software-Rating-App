import { Link } from 'react-router-dom';
import useWaiter from '../../../hooks/useWaiter';
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
  const [waiting, wait, stopWait] = useWaiter();

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
      {waiting && <WaitMessage styles={waitMessageStyles} />}
    </div>
  );
}

export default AccountPage;
