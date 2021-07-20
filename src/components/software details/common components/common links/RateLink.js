import { Link } from 'react-router-dom';
import { user } from '../../../../database/User';

function RateLink({ softwareID }) {
  const getDestinationInformation = () =>
    user.isSignedin()
      ? {
          pathname: `/software_details/${softwareID}/rate`,
        }
      : {
          pathname: '/signin',
          state: {
            from: `/software_details/${softwareID}`,
          },
        };

  return (
    <Link className='rate-link' to={getDestinationInformation()}>
      Rate this app
    </Link>
  );
}

export default RateLink;
