function ReviewLimitMessage({ maxReviewLength }) {
  return (
    <p className='review-limit-msg'>
      * Reached max characters ({maxReviewLength}) for review.
    </p>
  );
}

export default ReviewLimitMessage;
