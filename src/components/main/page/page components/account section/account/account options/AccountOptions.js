import { Link } from 'react-router-dom';
import SignoutLink from './signout link/SignoutLink';

function AccountOptions({ accountOptionsRef }) {
  return (
    <ul className='account__options' ref={accountOptionsRef}>
      <li>
        <Link className='account__option' to='/account'>
          Account
        </Link>
      </li>
      <li>
        <Link className='account__option' to='/rated_apps'>
          Rated Apps
        </Link>
      </li>
      <li>
        <SignoutLink />
      </li>
    </ul>
  );
}

export default AccountOptions;
