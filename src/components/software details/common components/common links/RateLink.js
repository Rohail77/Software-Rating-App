import { Component } from 'react';
import { Link } from 'react-router-dom';

class RateLink extends Component {
  render() {
    const { softwareID } = this.props;

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
}

export default RateLink;
