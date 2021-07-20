function NextPageButton({ updateCurrentPage, currentPage, isDisabled }) {
  const handleClick = () => updateCurrentPage(currentPage + 1);

  return (
    <li>
      <button
        className={`page${isDisabled ? '' : ' page--clickable'}`}
        onClick={handleClick}
        disabled={isDisabled}
        style={{ cursor: `${isDisabled ? 'auto' : 'pointer'}` }}
      >
        <img src='/images/right_arrow.svg' alt='right arrow' />
      </button>
    </li>
  );
}

export default NextPageButton;
