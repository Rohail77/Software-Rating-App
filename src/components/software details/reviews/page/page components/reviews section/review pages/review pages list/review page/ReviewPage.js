function ReviewPage({ pageNumber, isActive, updateCurrentPage }) {
  function handleClick(event) {
    event.preventDefault();
    updateCurrentPage(pageNumber);
  }
  return (
    <li>
      <button
        className={`page page--clickable${
          isActive ? ' active-review-page' : ''
        }`}
        onClick={handleClick}
      >
        {pageNumber}
      </button>
    </li>
  );
}

export default ReviewPage;
