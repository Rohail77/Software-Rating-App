import { UserReviewsContext } from '../../../context/UserReviewsContext';
import RatedAppsPageLogic from './RatedAppsPageLogic';

function RatedAppsContextConsumer() {
  return (
    <UserReviewsContext.Consumer>
      {value => <RatedAppsPageLogic {...value} />}
    </UserReviewsContext.Consumer>
  );
}

export default RatedAppsContextConsumer;
