import { useState } from 'react';
import useSoftwares from '../../../hooks/useSoftwares';
import MainPage from './MainPage';

function MainPageLogic(props) {
  const [state, setState] = useState({
    softwareSearchString: '',
  });

  const [softwares, fetchedSoftwares] = useSoftwares();

  const setSoftwareSearchString = string => {
    setState(state => ({
      ...state,
      softwareSearchString: string,
    }));
  };

  const getFilteredSoftwares = () => {
    const { softwareSearchString } = state;

    return softwareSearchString === ''
      ? softwares
      : softwares.filter(software => {
          return software.name
            .toLocaleLowerCase()
            .includes(softwareSearchString.toLocaleLowerCase());
        });
  };

  return (
    <MainPage
      softwares={getFilteredSoftwares()}
      setSoftwareSearchString={setSoftwareSearchString}
      fetchedSoftwares={fetchedSoftwares}
    />
  );
}

export default MainPageLogic;
