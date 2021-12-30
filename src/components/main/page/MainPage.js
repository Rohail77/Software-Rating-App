import { createRef, Fragment } from 'react';
import Search from './page components/search/Search';
import Software from './page components/software info/Software';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import WaitMessage from '../../common/wait message/WaitMessage';
import AccountUISelector from './page components/account section/AccountUISelector';
import Pages from '../../common/pages/Pages';

function MainPage(props) {
  const {
    softwares,
    setSoftwareSearchString,
    fetchedSoftwares,
    updateCurrentPage,
    currentPage,
    softwaresPerPage,
  } = props;

  const softwareSearchInput = createRef();

  const onHomePageClick = () => {
    setSoftwareSearchString('');
    emptySoftwareSearchInput();
  };

  const emptySoftwareSearchInput = () =>
    (softwareSearchInput.current.value = '');

  const getSoftwaresForCurrentPage = () =>
    softwares.slice(
      getInitialSoftwareIndexForCurrentPage(),
      getInitialSoftwareIndexForCurrentPage() + softwaresPerPage
    );

  const getInitialSoftwareIndexForCurrentPage = () =>
    (currentPage - 1) * softwaresPerPage;

  const softwaresForCurrentPage = getSoftwaresForCurrentPage();

  return (
    <Fragment>
      <header className='main-header'>
        <div className='main-header__flex main-wrapper wrapper'>
          <Link className='home-link' to='/' onClick={onHomePageClick}>
            Home
          </Link>
          <AccountUISelector />
        </div>
      </header>
      <div className='wrapper main-wrapper'>
        <Search
          setSoftwareSearchString={setSoftwareSearchString}
          softwareSearchInput={softwareSearchInput}
        />
        {!fetchedSoftwares ? (
          <WaitMessage />
        ) : softwaresForCurrentPage.length === 0 ? (
          <p className='no-results-msg'>No results!</p>
        ) : (
          <Fragment>
            <ul className='softwares-list'>
              {softwaresForCurrentPage.map(software => (
                <Software software={software} key={uuidv4()} />
              ))}
            </ul>
            <Pages
              totalItems={softwares.length}
              itemsPerPage={softwaresPerPage}
              currentPage={currentPage}
              updateCurrentPage={updateCurrentPage}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default MainPage;
