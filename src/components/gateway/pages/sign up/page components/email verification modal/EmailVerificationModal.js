import { Link } from 'react-router-dom';

function EmailVerificationModal({ email }) {
  return (
    <div className='email-verification-modal-wrapper'>
      <section className='email-verification-modal'>
        <p>
          We sent a verfication email to {email}. After verification, click the
          button below to sign in.
        </p>
        <Link
          to={{
            pathname: '/signin',
            state: {
              from: '/',
            },
          }}
        >
          I have Verified{' '}
        </Link>
      </section>
    </div>
  );
}

export default EmailVerificationModal;
