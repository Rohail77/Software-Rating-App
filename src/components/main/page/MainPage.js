import { createRef } from 'react';
import Search from './page components/search/Search';
import Software from './page components/software info/Software';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import WaitMessage from '../../common/wait message/WaitMessage';
import AccountUISelector from './page components/account section/AccountUISelector';
import Pages from '../../common/pages/Pages';
import usePagination from '../../../hooks/usePagination';

const SOFTWARES_PER_PAGE = 20;

function MainPage(props) {
  const { softwares, setSoftwareSearchString, fetchedSoftwares } = props;

  const softwareSearchInput = createRef();

  const onHomePageClick = () => {
    setSoftwareSearchString('');
    emptySoftwareSearchInput();
  };

  const emptySoftwareSearchInput = () =>
    (softwareSearchInput.current.value = '');

  const [itemsForCurrentPage, pagination] = usePagination(
    softwares,
    SOFTWARES_PER_PAGE
  );

  return (
    <>
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
        ) : itemsForCurrentPage.length === 0 ? (
          <p className='no-results-msg'>No results!</p>
        ) : (
          <>
            <ul className='softwares-list'>
              {itemsForCurrentPage.map(software => (
                <Software software={software} key={uuidv4()} />
              ))}
            </ul>
            <Pages {...pagination} />
          </>
        )}
      </div>
    </>
  );
}

export default MainPage;
