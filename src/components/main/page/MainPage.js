import { createRef } from 'react';
import Search from './page components/search/Search';
import Software from './page components/software info/Software';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import WaitMessage from '../../software details/rate/page/page components/wait message/WaitMessage';

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
    <div className='wrapper main-wrapper'>
      <div className='breadcrumbs'>
        <Link
          className='page-link active-page-link'
          to={{
            pathname: '/',
          }}
          onClick={onHomePageClick}
        >
          Home
        </Link>
      </div>
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
  );
}

export default MainPage;
