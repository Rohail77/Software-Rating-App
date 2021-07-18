import { Link } from 'react-router-dom';

function SigninLink({ from }) {
  return (
    <Link className='signin-link' to={{ pathname: '/signin', state: { from } }}>
      Sign in
    </Link>
  );
}

export default SigninLink;
