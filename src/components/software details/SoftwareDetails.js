import { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import SoftwareDetailsContent from './SoftwareDetailsContent';

class SoftwareDetails extends Component {

  render() {
    const { software, reviews } = this.props;

    return (
      <Fragment>
        <div className='wrapper software-details-wrapper'>
          <div className='breadcrumbs'>
            <Link
              className='page-link'
              to={{
                pathname: '/',
              }}
            >
              Home
            </Link>
            <span> \ </span>
            <Link
              className='page-link active-page-link'
              to={{
                pathname: `/software_details/${software.id}`,
              }}
            >
              {software.name}
            </Link>
          </div>
          <SoftwareDetailsContent software={software} reviews={reviews} />
        </div>
      </Fragment>
    );
  }
}

export default SoftwareDetails;
