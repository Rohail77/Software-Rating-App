import PagesList from './pages list/PagesList';

function Pages({ currentPage, totalPages, updateCurrentPage }) {
  return (
    <div className='pages'>
      {totalPages > 1 && (
        <>
          <PagesList
            currentPage={currentPage}
            totalPages={totalPages}
            updateCurrentPage={updateCurrentPage}
          />
          <p className='pages__info'>
            Page {currentPage} of{' '}
            <span className='pages__info__total-pages'>{totalPages}</span>
          </p>
        </>
      )}
    </div>
  );
}

export default Pages;
