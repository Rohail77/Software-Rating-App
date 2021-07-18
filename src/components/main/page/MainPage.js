import { createRef, Fragment } from 'react';
import Search from './page components/search/Search';
import Software from './page components/software info/Software';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import WaitMessage from '../../common/wait message/WaitMessage';
import AccountUISelector from './page components/account section/AccountUISelector';

function MainPage({ setSoftwareSearchString, softwares, onWait }) {
  const softwareSearchInput = createRef();

  function onHomePageClick() {
    setSoftwareSearchString('');
    emptySoftwareSearchInput();
  }

  function emptySoftwareSearchInput() {
    softwareSearchInput.current.value = '';
  }

  return (
    <Fragment>
      <header className='main-header'>
        <div className='main-header__flex main-wrapper wrapper'>
            <Link
              className='home-link'
              to={{
                pathname: '/',
              }}
              onClick={onHomePageClick}
            >
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
        {onWait ? (
          <WaitMessage />
        ) : (
          <ul className='softwares-list'>
            {softwares.map(software => (
              <Software software={software} key={uuidv4()} />
            ))}
          </ul>
        )}
      </div>
    </Fragment>
  );
}

export default MainPage;
