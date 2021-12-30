import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { softwares as softwares_imp } from '../database/Softwares';
import { set } from '../features/softwaresSlice';

function useSoftwares() {
  const [softwares, fetched] = useSelector(state => [
    state.softwares.list,
    state.softwares.fetched,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) {
      softwares_imp.getSoftwares(softwares => dispatch(set(softwares)));
    }
  }, []);

  return [softwares, fetched];
}

export default useSoftwares;
