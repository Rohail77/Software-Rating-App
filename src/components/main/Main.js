import React from 'react';
import Search from './page components/Search';
import Software from './page components/Software';
import { v4 as uuidv4 } from 'uuid';
import HomeLink from '../common/HomeLink';

function Main(props) {
  const { setSoftwareSearchString, softwares, getReviews } = props;

  return (
    <div className='wrapper main-wrapper'>
      <div className='breadcrumbs'>
        <HomeLink isActive={true}/>
      </div>
      <Search setSoftwareSearchString={setSoftwareSearchString} />
      <ul className='softwares-list'>
        {softwares.map(software => (
          <Software
            software={software}
            key={uuidv4()}
            getReviews={getReviews}
          />
        ))}
      </ul>
    </div>
  );
}

export default Main;
