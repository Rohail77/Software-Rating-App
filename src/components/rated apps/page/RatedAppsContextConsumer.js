import { Component, Fragment } from 'react';
import { UserReviewsContext } from '../../../context/UserReviewsContext';
import RatedAppsPageLogic from './RatedAppsPageLogic';

class RatedAppsContextConsumer extends Component {
  render() {
    return (
      <Fragment>
        <UserReviewsContext.Consumer>
          {value => <RatedAppsPageLogic {...value}/>}
        </UserReviewsContext.Consumer>
      </Fragment>
    );
  }
}

export default RatedAppsContextConsumer;
