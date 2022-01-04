import PastRating from './past rating/PastRating';
import { v4 as uuidv4 } from 'uuid';
import WaitMessage from '../../../../common/wait message/WaitMessage';
import useWaiter from '../../../../../hooks/useWaiter';

function PastRatingsList(props) {
  const { userReviews, fetchedUserReviews } = props;
  const [waiting] = useWaiter(!fetchedUserReviews);

  return (
    <>
      {waiting ? (
        <WaitMessage styles={{ marginTop: '6em' }} />
      ) : (
        <ul className='past-reviews-list'>
          {userReviews.map(userReview => (
            <PastRating userReview={userReview} key={uuidv4()} />
          ))}
        </ul>
      )}
    </>
  );
}

export default PastRatingsList;
