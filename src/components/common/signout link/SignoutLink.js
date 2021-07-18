import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import { authorization } from '../../gateway/auth/Authorization';

function SignoutLink() {
  const handleClick = cb => {
    authorization.signout();
    cb(false);
  };
  return (
    <UserContext.Consumer>
      {user => (
        <Link
          className='signout-link'
          onClick={event => {
            event.preventDefault();
            handleClick(user.handleLogin);
          }}
          to='/'
        >
          <span>Signout</span>
          <img src='/images/signout.svg' alt='signout' />
        </Link>
      )}
    </UserContext.Consumer>
  );
}

export default SignoutLink;
