import EmailVerificationModal from './email verification modal/EmailVerificationModal';
import FormError from '../form error/FormError';
import WaitMessage from '../../common/wait message/WaitMessage';
import { Link } from 'react-router-dom';

function Signup(props) {
  const {
    name,
    email,
    password,
    signedUp,
    hasError,
    errorMsg,
    onWait,
    handleChange,
    handleSubmit,
    isEmailVerified,
  } = props;

  return (
    <div className='gateway-wrapper'>
      <section className='gateway-form-section'>
        <form className='gateway-form' onSubmit={handleSubmit}>
          <h1 className='main-h'>Sign Up</h1>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='At least 6 characters long'
              value={password}
              onChange={handleChange}
            />
          </div>
          {hasError ? <FormError error={errorMsg} /> : null}
          <input type='submit' className='submit-btn' />
        </form>
        <p className='gateway-para'>
          Already registered?{' '}
          <Link
            className='gateway-link'
            to={{
              pathname: '/signin',
            }}
          >
            Sign in{' '}
          </Link>{' '}
          instead.
        </p>
      </section>
      {signedUp ? (
        <EmailVerificationModal
          email={email}
          isEmailVerified={isEmailVerified}
        />
      ) : null}
      {onWait ? <WaitMessage /> : null}
    </div>
  );
}

export default Signup;
