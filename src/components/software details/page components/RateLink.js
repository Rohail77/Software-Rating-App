import { Component } from 'react';
import { Link } from 'react-router-dom';

class RateLink extends Component {
  render() {
    const { software } = this.props;

    return (
      <Link
        href='/rate'
        className='rate-link'
        to={{
          pathname: '/rate',
          state: {
            software,
          },
        }}
      >
        Rate this app
      </Link>
    );
  }
}

export default RateLink;
