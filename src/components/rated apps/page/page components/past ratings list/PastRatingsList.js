import { Fragment } from 'react';
import PastRating from './past rating/PastRating';
import { v4 as uuidv4 } from 'uuid';
import WaitMessage from '../../../../common/wait message/WaitMessage';

function PastRatingsList(props) {
  const { userReviews, fetchedUserReviews, getUpdatedUserReviews } = props;

  return (
    <Fragment>
      {!fetchedUserReviews ? (
        <WaitMessage />
      ) : (
        <ul className='past-reviews-list'>
          {userReviews.map(userReview => (
            <PastRating
              userReview={userReview}
              getUpdatedUserReviews={getUpdatedUserReviews}
              key={uuidv4()}
            />
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default PastRatingsList;
