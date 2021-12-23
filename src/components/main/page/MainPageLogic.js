import { useState } from 'react';
import MainPage from './MainPage';

function MainPageLogic(props) {
  const [state, setState] = useState({
    currentPage: 1,
    softwareSearchString: '',
  });
  const data = {
    softwaresPerPage: 20,
  };

  const updateCurrentPage = newPageNumber => {
    setState(state => ({
      ...state,
      currentPage: newPageNumber,
    }));
  };

  const setSoftwareSearchString = string => {
    setState(state => ({
      ...state,
      softwareSearchString: string,
      currentPage: 1,
    }));
  };

  const getFilteredSoftwares = () => {
    const { softwareSearchString } = state;
    const { softwares } = props;

    return softwareSearchString === ''
      ? softwares
      : softwares.filter(software => {
          return software.name
            .toLocaleLowerCase()
            .includes(softwareSearchString.toLocaleLowerCase());
        });
  };
  const { onWait } = props;
  const { currentPage } = state;
  const { softwaresPerPage } = data;

  return (
    <MainPage
      softwares={getFilteredSoftwares()}
      setSoftwareSearchString={setSoftwareSearchString}
      onWait={onWait}
      updateCurrentPage={updateCurrentPage}
      currentPage={currentPage}
      softwaresPerPage={softwaresPerPage}
    />
  );
}

export default MainPageLogic;
