import EmailVerificationModal from './page components/email verification modal/EmailVerificationModal';
import FormError from '../../common components/FormError';
import WaitMessage from '../../../common/wait message/WaitMessage';
import BackLink from '../../common components/BackLink';
import SigninLink from '../../../common/signin link/SigninLink';

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
    from,
  } = props;

  return (
    <div className='gateway-wrapper'>
      <section className='gateway-form-section'>
        <BackLink from={from} />
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
          {hasError && <FormError error={errorMsg} />}
          <input type='submit' className='submit-btn' value='Signup' />
        </form>
        <p className='gateway-para'>
          Already registered? <SigninLink from={from} /> instead.
        </p>
      </section>
      {signedUp && <EmailVerificationModal email={email} />}
      {onWait && <WaitMessage />}
    </div>
  );
}

export default Signup;
