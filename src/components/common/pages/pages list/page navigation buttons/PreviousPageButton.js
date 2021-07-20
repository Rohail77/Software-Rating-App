function PreviousPageButton({ updateCurrentPage, currentPage, isDisabled }) {
  const handleClick = () => updateCurrentPage(currentPage - 1);

  return (
    <li>
      <button
        className={`page${isDisabled ? '' : ' page--clickable'}`}
        onClick={handleClick}
        disabled={isDisabled}
        style={{ cursor: `${isDisabled ? 'auto' : 'pointer'}` }}
      >
        <img src='/images/left_arrow.svg' alt='left arrow' />
      </button>
    </li>
  );
}

export default PreviousPageButton;
