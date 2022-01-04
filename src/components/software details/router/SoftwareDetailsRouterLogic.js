import { useEffect, useState } from 'react';

import SoftwareDetailsRouter from './SoftwareDetailsRouter';
import { canUserReview, signedin } from '../../../database/User';
import { CanUserReviewContext } from '../../../context/CanUserReviewContext';

function SoftwareDetailsRouterLogic(props) {
  const [state, setState] = useState({
    canUserReview: false,
  });

  const setCanUserReview = canUserReview => {
    setState(state => ({
      ...state,
      canUserReview,
    }));
  };

  useEffect(() => {
    const { id } = props.software;
    if (signedin())
      canUserReview(id).then(canUserReview => setCanUserReview(canUserReview));
  }, []);

  return (
    <CanUserReviewContext.Provider
      value={{
        canUserReview: state.canUserReview,
        setCanUserReview: setCanUserReview,
      }}
    >
      <SoftwareDetailsRouter {...props} {...state} />
    </CanUserReviewContext.Provider>
  );
}

export default SoftwareDetailsRouterLogic;
