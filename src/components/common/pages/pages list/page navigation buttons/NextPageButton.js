function NextPageButton({ updateCurrentPage, currentPage, disabled }) {
  return (
    <li>
      <button
        className={`page${disabled ? '' : ' page--clickable'}`}
        onClick={() => updateCurrentPage(currentPage + 1)}
        disabled={disabled}
        style={{ cursor: `${disabled ? 'auto' : 'pointer'}` }}
      >
        <img src='/images/right_arrow.svg' alt='right arrow' />
      </button>
    </li>
  );
}

export default NextPageButton;
