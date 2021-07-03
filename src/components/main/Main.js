import React from 'react';
import Search from './page components/Search';
import Software from './page components/Software';
import { v4 as uuidv4 } from 'uuid';

function Main(props) {
  return (
    <div className='wrapper main-wrapper'>
      <div className='breadcrumbs'>
        <a href='/' className='page-link active-page-link'>
          Home
        </a>
      </div>
      <Search setSoftwareSearchString={props.setSoftwareSearchString} />
      <ul className='softwares-list'>
        {props.softwares.map(software => (
          <Software software={software} key={uuidv4()} />
        ))}
      </ul>
    </div>
  );
}

export default Main;
