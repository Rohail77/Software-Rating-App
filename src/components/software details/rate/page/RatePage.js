import { Component} from 'react';
import ConfirmationModal from './page components/confirmation modal/ConfirmationModal';
import ReviewForm from './page components/review form/ReviewForm';
import { Link } from 'react-router-dom';
import HomeLink from '../../../common/home link/HomeLink';
import Software from './page components/software info/Software';
import { GetReviewsContext } from '../../../../context/GetReviewsContext';

class RatePage extends Component {

  render() {
    const { name, developer, id, formSubmitted } = this.props;

    return (
      <div className='wrapper rate-wrapper'>
        <div className='breadcrumbs'>
          <HomeLink isActive={false} />
          <span> \ </span>
          <Link
            className='page-link'
            to={{
              pathname: `/software_details/${id}`,
            }}
          >
            {name}
          </Link>
          <span> \ </span>
          <Link
            className='page-link active-page-link'
            to={{
              pathname: `/software_details/${id}/rate`,
            }}
          >
            Rate
          </Link>
        </div>

        <Software name={name} developer={developer} />

        <GetReviewsContext.Consumer>
          {getReviews => {
            return (
              <ReviewForm
                showConfirmationModal={this.showConfirmationModal}
                softwareID={id}
                getUpdatedReviews={getReviews}
              />
            );
          }}
        </GetReviewsContext.Consumer>

        {formSubmitted ? (
          <ConfirmationModal softwareID={id} />
        ) : null}
      </div>
    );
  }
}

export default RatePage;
