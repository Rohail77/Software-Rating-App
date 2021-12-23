import { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { softwares } from './database/Softwares';
import { authorization } from './components/gateway/auth/Authorization';
import { BrowserRouter as Router } from 'react-router-dom';
import { user } from './database/User';
import { UserReviewsContext } from './context/UserReviewsContext';
import { UpdateSoftwareContext } from './context/UpdateSoftwareContext';

function App(props) {
  const [state, setState] = useState({
    softwares: [],
    onWait: true,
    loggedin: false,
    userReviews: [],
    fetchingUserReviews: false,
  });

  useEffect(() => {
    softwares.getSoftwares(softwares =>
      setState(state => ({
        ...state,
        softwares: softwares,
        onWait: false,
      }))
    );
    authorization.onLoginDetection(handleLogin);
  }, []);

  const updateSoftware = id => {
    softwares.getSoftware(id, updatedSoftware => {
      setState(state => ({
        ...state,
        softwares: state.softwares.map(software => {
          return software.id === updatedSoftware.id
            ? updatedSoftware
            : software;
        }),
      }));
    });
  };

  const handleLogin = loggedin => {
    if (loggedin) user.set();
    setState(state => ({
      ...state,
      loggedin,
    }));
  };

  useEffect(() => {
    if (state.loggedin) {
      getUserReviews();
      user.bindUpdaterToReviews(getUserReviews);
    }
  }, [state.loggedin]);

  const getUserReviews = () => {
    setState(state => ({
      ...state,
      fetchingUserReviews: true,
    }));
    user.getReviews(userReviews => {
      setState(state => ({
        ...state,
        userReviews,
        fetchingUserReviews: false,
      }));
    });
  };

  return (
    <Router>
      <UserReviewsContext.Provider
        value={{
          userReviews: state.userReviews,
          fetchingUserReviews: state.fetchingUserReviews,
          getUpdatedUserReviews: getUserReviews,
        }}
      >
        <UpdateSoftwareContext.Provider value={updateSoftware}>
          <AppRouter {...state} />
        </UpdateSoftwareContext.Provider>
      </UserReviewsContext.Provider>
    </Router>
  );
}

export default App;
