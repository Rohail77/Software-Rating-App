import { Link } from 'react-router-dom';

function BackLink({ from }) {
  return (
    <Link className='back-link' to={from}>
      <img src='/images/back arrow.svg' alt='back arrow' /> <span>Back</span>
    </Link>
  );
}

export default BackLink;
