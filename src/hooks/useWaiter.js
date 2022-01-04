import { useEffect, useState } from 'react';

function useWaiter(waiting = null) {
  const [state, setState] = useState({
    waiting: false,
  });

  useEffect(() => {
    if (waiting !== null) {
      setState({
        waiting,
      });
    }
  }, [waiting]);

  const wait = () => {
    setState({ waiting: true });
  };
  const stopWait = () => {
    setState({ waiting: false });
  };

  return [state.waiting, wait, stopWait];
}

export default useWaiter;
