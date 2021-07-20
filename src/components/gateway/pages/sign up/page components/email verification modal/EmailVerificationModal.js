import { Link } from 'react-router-dom';

function EmailVerificationModal({ email }) {
  return (
    <div className='email-verification-modal-wrapper'>
      <section className='email-verification-modal'>
        <p>
          We sent a verfication email to {email}. You can signin after verification.
        </p>
        <Link
          to={{
            pathname: '/signin',
            state: {
              from: '/',
            },
          }}
        >
          Sign in{' '}
        </Link>
      </section>
    </div>
  );
}

export default EmailVerificationModal;
