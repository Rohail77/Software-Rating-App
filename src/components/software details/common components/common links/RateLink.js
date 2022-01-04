import { Link } from 'react-router-dom';
import { signedin } from '../../../../database/User';

function RateLink({ softwareID, from }) {
  const getDestinationInformation = () =>
    signedin()
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
