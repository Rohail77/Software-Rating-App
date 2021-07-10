import { Link } from 'react-router-dom';
import { UserContext } from '../../../../context/userContext';

function RateLink({ softwareID }) {
  const getDestinationInformation = function (loggedin) {
    return loggedin
      ? {
          pathname: `/software_details/${softwareID}/rate`,
        }
      : {
          pathname: '/signin',
          state: {
            from: `/software_details/${softwareID}`,
          },
        };
  };

  return (
    <UserContext.Consumer>
      {user => {
        return (
          <Link
            className='rate-link'
            to={getDestinationInformation(user.loggedin)}
          >
            Rate this app
          </Link>
        );
      }}
    </UserContext.Consumer>
  );
}

export default RateLink;
