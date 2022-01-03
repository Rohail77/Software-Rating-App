function PreviousPageButton({ updateCurrentPage, currentPage, disabled }) {
  return (
    <li>
      <button
        className={`page${disabled ? '' : ' page--clickable'}`}
        onClick={() => updateCurrentPage(currentPage - 1)}
        disabled={disabled}
        style={{ cursor: `${disabled ? 'auto' : 'pointer'}` }}
      >
        <img src='/images/left_arrow.svg' alt='left arrow' />
      </button>
    </li>
  );
}

export default PreviousPageButton;
