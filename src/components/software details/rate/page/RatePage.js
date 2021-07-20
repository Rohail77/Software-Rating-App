import ConfirmationModal from './page components/confirmation modal/ConfirmationModal';
import ReviewForm from './page components/review form/ReviewForm';
import { Link } from 'react-router-dom';
import HomeLink from '../../../common/home link/HomeLink';
import Software from './page components/software info/Software';
import { UserReviewsContext } from '../../../../context/UserReviewsContext';
import { UpdateSoftwareContext } from '../../../../context/UpdateSoftwareContext';

function RatePage(props) {
  const {
    name,
    developer,
    id,
    formSubmitted,
    setCanUserReview,
    showConfirmationModal,
  } = props;

  return (
    <div className='wrapper rate-wrapper'>
      <div className='breadcrumbs'>
        <HomeLink isActive={false} />
        <span> \ </span>
        <Link className='page-link' to={`/software_details/${id}`}>
          {name}
        </Link>
        <span> \ </span>
        <Link
          className='page-link active-page-link'
          to={`/software_details/${id}/rate`}
        >
          Rate
        </Link>
      </div>

      <Software name={name} developer={developer} />

      <UserReviewsContext.Consumer>
        {({ getUpdatedUserReviews }) => (
          <UpdateSoftwareContext.Consumer>
            {updateSoftware => (
              <ReviewForm
                showConfirmationModal={showConfirmationModal}
                softwareID={id}
                getUpdatedUserReviews={getUpdatedUserReviews}
                updateSoftware={updateSoftware}
              />
            )}
          </UpdateSoftwareContext.Consumer>
        )}
      </UserReviewsContext.Consumer>

      {formSubmitted ? (
        <ConfirmationModal
          softwareID={id}
          setCanUserReview={setCanUserReview}
        />
      ) : null}
    </div>
  );
}

export default RatePage;
