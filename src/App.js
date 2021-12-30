import { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { softwares as softwares_imp } from './database/Softwares';
import { authorization } from './components/gateway/auth/Authorization';
import { BrowserRouter as Router } from 'react-router-dom';
import { user } from './database/User';
import { UserReviewsContext } from './context/UserReviewsContext';
import { UpdateSoftwareContext } from './context/UpdateSoftwareContext';
import useSoftwares from './hooks/useSoftwares';
import useUserReviews from './hooks/useUserReviews';

function App(props) {
  const [state, setState] = useState({
    onWait: true,
    loggedin: false,
  });

  const [softwares, setSoftwares, fetchedSoftwares] = useSoftwares();
  const [userReviews, getUserReviews, fetchedUserReviews] = useUserReviews(
    state.loggedin
  );

  useEffect(() => {
    authorization.onLoginDetection(handleLogin);
  }, []);

  const handleLogin = loggedin => {
    if (loggedin) user.set();
    setState(state => ({
      ...state,
      loggedin,
    }));
  };

  useEffect(() => {
    if (fetchedSoftwares)
      setState(state => ({
        ...state,
        onWait: false,
      }));
  }, [fetchedSoftwares]);

  const updateSoftware = id => {
    softwares_imp.getSoftware(id, updatedSoftware => {
      setSoftwares(softwares =>
        softwares.map(software =>
          software.id === updatedSoftware.id ? updatedSoftware : software
        )
      );
    });
  };

  return (
    <Router>
      <UserReviewsContext.Provider
        value={{
          userReviews: userReviews,
          fetchingUserReviews: !fetchedUserReviews,
          getUpdatedUserReviews: getUserReviews,
        }}
      >
        <UpdateSoftwareContext.Provider value={updateSoftware}>
          <AppRouter {...state} softwares={softwares} />
        </UpdateSoftwareContext.Provider>
      </UserReviewsContext.Provider>
    </Router>
  );
}

export default App;
