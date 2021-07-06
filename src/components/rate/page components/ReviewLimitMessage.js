function ReviewLimitMessage(props) {
  const { maxReviewLength } = props;
  return (
    <p className='review-limit-msg'>
      * Reached max characters ({maxReviewLength}) for review.
    </p>
  );
}

export default ReviewLimitMessage;
