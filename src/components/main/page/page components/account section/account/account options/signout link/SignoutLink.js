import { Link } from 'react-router-dom';
import { authorization } from '../../../../../../../gateway/auth/Authorization';

function SignoutLink() {
  const handleClick = () => authorization.signout();

  return (
    <Link className='signout-link' onClick={handleClick} to='/'>
      <span>Signout</span>
      <img src='/images/signout.svg' alt='signout' />
    </Link>
  );
}

export default SignoutLink;
