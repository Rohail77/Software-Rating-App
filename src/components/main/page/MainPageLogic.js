import { useState } from 'react';
import useSoftwares from '../../../hooks/useSoftwares';
import { stringIncludes } from '../../../utils/util-functions';
import MainPage from './MainPage';

function MainPageLogic(props) {
  const [state, setState] = useState({
    softwareSearchString: '',
  });

  const [softwares, fetchedSoftwares] = useSoftwares();

  const setSoftwareSearchString = string =>
    setState(state => ({
      ...state,
      softwareSearchString: string,
    }));

  const getFilteredSoftwares = () =>
    state.softwareSearchString === ''
      ? softwares
      : softwares.filter(software =>
          stringIncludes(software.name, state.softwareSearchString)
        );

  return (
    <MainPage
      softwares={getFilteredSoftwares()}
      setSoftwareSearchString={setSoftwareSearchString}
      fetchedSoftwares={fetchedSoftwares}
    />
  );
}

export default MainPageLogic;
