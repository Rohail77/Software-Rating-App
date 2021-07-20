import { Fragment } from 'react';
import PastRating from './past rating/PastRating';
import { v4 as uuidv4 } from 'uuid';
import { UpdateSoftwareContext } from '../../../../../context/UpdateSoftwareContext';
import WaitMessage from '../../../../common/wait message/WaitMessage';

function PastRatingsList(props) {
  const { userReviews, fetchingUserReviews, getUpdatedUserReviews } = props;

  return (
    <Fragment>
      {fetchingUserReviews ? (
        <WaitMessage />
      ) : (
        <ul className='past-reviews-list'>
          <UpdateSoftwareContext.Consumer>
            {updateSoftware => {
              return userReviews.map(userReview => (
                <PastRating
                  userReview={userReview}
                  updateSoftware={updateSoftware}
                  getUpdatedUserReviews={getUpdatedUserReviews}
                  key={uuidv4()}
                />
              ));
            }}
          </UpdateSoftwareContext.Consumer>
        </ul>
      )}
    </Fragment>
  );
}

export default PastRatingsList;
