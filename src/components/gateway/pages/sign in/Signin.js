import WaitMessage from '../../../common/wait message/WaitMessage';
import FormError from '../../common components/FormError';
import BackLink from '../../common components/BackLink';
import { Link } from 'react-router-dom';

function Signin(props) {
  const {
    email,
    password,
    handleChange,
    handleSubmit,
    hasError,
    errorMsg,
    onWait,
    from,
  } = props;

  return (
    <div className='gateway-wrapper'>
      <section className='gateway-form-section'>
        <BackLink from={from} />
        <form className='gateway-form' onSubmit={handleSubmit}>
          <h1 className='main-h'>Sign In</h1>
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
              value={password}
              onChange={handleChange}
            />
          </div>
          {hasError ? <FormError error={errorMsg} /> : null}

          <input type='submit' className='submit-btn' />
        </form>
        <p className='gateway-para'>
          Don’t have an account?{' '}
          <Link
            className='signup-link'
            to={{
              pathname: '/signup',
              state: {
                from,
              },
            }}
          >
            Sign up{' '}
          </Link>{' '}
          instead.
        </p>
      </section>
      {onWait ? <WaitMessage /> : null}
    </div>
  );
}

export default Signin;
