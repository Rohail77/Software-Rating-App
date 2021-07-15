import { Component, Fragment } from 'react';
import PastReview from './past review/PastReview';
import { v4 as uuidv4 } from 'uuid';
import { UpdateSoftwareContext } from '../../../context/UpdateSoftwareContext';
import WaitMessage from '../../common/wait message/WaitMessage';

class PastReviews extends Component {
  render() {
    const { userReviews, fetchingUserReviews, getUpdatedUserReviews } =
      this.props;

    return (
      <Fragment>
        {fetchingUserReviews ? (
          <WaitMessage />
        ) : (
          <ul className='past-reviews-list'>
            <UpdateSoftwareContext.Consumer>
              {updateSoftware => {
                return userReviews.map(userReview => (
                  <PastReview
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
}

export default PastReviews;
