import { useEffect, useState } from 'react';
import { softwares } from '../database/Softwares';

function useSoftwares() {
  const [state, setState] = useState(null);

  useEffect(() => {
    softwares.getSoftwares(softwares => setState(softwares));
  }, []);

  return state ? [state, setState, true] : [[], setState, false];
}

export default useSoftwares;
