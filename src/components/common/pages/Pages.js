import PagesList from './pages list/PagesList';

function Pages(props) {
  const { currentPage, totalItems, itemsPerPage, updateCurrentPage } = props;

  const getTotalPages = () => Math.ceil(totalItems / itemsPerPage);

  return (
    <div className='pages'>
      <PagesList
        currentPage={currentPage}
        totalPages={getTotalPages()}
        updateCurrentPage={updateCurrentPage}
      />
      <p className='pages__info'>
        Page {currentPage} of{' '}
        <span className='pages__info__total-pages'>{getTotalPages()}</span>
      </p>
    </div>
  );
}

export default Pages;
