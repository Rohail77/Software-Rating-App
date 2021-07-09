import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='not-found-wrapper'>
      <section>
        <h1 className='not-found-h'>404 </h1>
        <p className='not-found-para'>
          Page Not Found. We could not find your requested URL. Click{' '}
          <Link
            className='back-link--text'
            to={{
              pathname: '/',
            }}
          >
            here
          </Link>{' '}
          to return to home page
        </p>
        <Link
          className='back-link--btn'
          to={{
            pathname: '/',
          }}
        >
          Back to home
        </Link>
      </section>
    </div>
  );
}

export default NotFound;
