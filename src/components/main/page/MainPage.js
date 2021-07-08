import React, { Component, createRef } from 'react';
import Search from './page components/search/Search';
import Software from './page components/software info/Software';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import WaitMessage from '../../software details/rate/page/page components/wait message/WaitMessage';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.onHomePageClick = this.onHomePageClick.bind(this);
    this.softwareSearchInput = createRef();
  }

  onHomePageClick() {
    const { setSoftwareSearchString } = this.props;
    setSoftwareSearchString('');
    this.emptySoftwareSearchInput();
  }

  emptySoftwareSearchInput() {
    this.softwareSearchInput.current.value = '';
  }

  render() {
    const { setSoftwareSearchString, softwares, onWait } = this.props;
    return (
      <div className='wrapper main-wrapper'>
        <div className='breadcrumbs'>
          <Link
            className='page-link active-page-link'
            to={{
              pathname: '/',
            }}
            onClick={this.onHomePageClick}
          >
            Home
          </Link>
        </div>
        <Search
          setSoftwareSearchString={setSoftwareSearchString}
          softwareSearchInput={this.softwareSearchInput}
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
}

export default MainPage;
