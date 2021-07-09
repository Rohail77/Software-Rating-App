import { Link } from 'react-router-dom';

function RateLink({softwareID}) {

  return (
    <Link
      className='rate-link'
      to={{
        pathname: `/software_details/${softwareID}/rate`,
      }}
    >
      Rate this app
    </Link>
  );
}

export default RateLink;
