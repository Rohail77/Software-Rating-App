import { useState } from 'react';
import { CanUserReviewContext } from '../../../../context/CanUserReviewContext';
import AlreadyRatedMessage from './already rated message/AlreadyRatedMessage';
import RatePage from './RatePage';

function RatePageLogic(props) {
  const [state, setState] = useState({
    formSubmitted: false,
  });

  const showConfirmationModal = () =>
    setState({
      formSubmitted: true,
    });

  const { name, developer, id } = props.software;
  const { formSubmitted } = state;

  return (
    <CanUserReviewContext.Consumer>
      {value =>
        value.canUserReview ? (
          <RatePage
            name={name}
            id={id}
            developer={developer}
            formSubmitted={formSubmitted}
            showConfirmationModal={showConfirmationModal}
            setCanUserReview={value.setCanUserReview}
          />
        ) : (
          <AlreadyRatedMessage softwareID={id} />
        )
      }
    </CanUserReviewContext.Consumer>
  );
}

export default RatePageLogic;
