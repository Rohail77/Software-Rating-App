import Page from './page/Page';
import { v4 as uuidv4 } from 'uuid';
import PreviousPageButton from './page navigation buttons/PreviousPageButton';
import NextPageButton from './page navigation buttons/NextPageButton';

function PagesList({ currentPage, totalPages, updateCurrentPage }) {
  const endPagesNotReached = () => currentPage + 2 <= totalPages;

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (endPagesNotReached()) {
      for (
        let pageNumber = currentPage;
        pageNumber <= currentPage + 2;
        pageNumber++
      ) {
        pageNumbers.push(pageNumber);
      }
    } else {
      for (
        let pageNumber = totalPages - 2;
        pageNumber <= totalPages;
        pageNumber++
      ) {
        if (pageNumber > 0) pageNumbers.push(pageNumber);
      }
    }
    return pageNumbers;
  };

  const disablePreviousPageButton = () => currentPage === 1;

  const disableNextPageButton = () => currentPage === totalPages;

  return (
    <ul className='pages__list'>
      <PreviousPageButton
        disabled={disablePreviousPageButton()}
        currentPage={currentPage}
        updateCurrentPage={updateCurrentPage}
      />
      {getPageNumbers().map(pageNumber => (
        <Page
          pageNumber={pageNumber}
          updateCurrentPage={updateCurrentPage}
          isActive={pageNumber === currentPage}
          key={uuidv4()}
        />
      ))}
      <NextPageButton
        disabled={disableNextPageButton()}
        currentPage={currentPage}
        updateCurrentPage={updateCurrentPage}
      />
    </ul>
  );
}

export default PagesList;
