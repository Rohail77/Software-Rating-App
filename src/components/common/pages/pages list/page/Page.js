function Page({ pageNumber, isActive, updateCurrentPage }) {
  return (
    <li>
      <button
        className={`page page--clickable${isActive ? ' active-page' : ''}`}
        onClick={() => updateCurrentPage(pageNumber)}
      >
        {pageNumber}
      </button>
    </li>
  );
}

export default Page;
