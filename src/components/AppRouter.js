import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import EditReviewsPage from './edit reviews/EditReviewsPage';
import SigninLogic from './gateway/sign in/SigninLogic';
import SignupLogic from './gateway/sign up/SignupLogic';
import MainPageLogic from './main/page/MainPageLogic';
import NotFound from './not found page/NotFound';
import SoftwareDetailsRouterLogic from './software details/router/SoftwareDetailsRouterLogic';

function AppRouter(props) {
  function getSoftware(id) {
    const { softwares } = props;
    return softwares.find(software => software.id === id);
  }

  return (
      <Switch>
        <Route
          path='/software_details/:id'
          render={props => {
            const { id } = props.match.params;
            const software = getSoftware(id);
            return software ? (
              <SoftwareDetailsRouterLogic software={software} />
            ) : (
              <NotFound />
            );
          }}
        />
        <Route
          path='/'
          exact
          render={() => {
            return <MainPageLogic {...props} />;
          }}
        />
        <Route
          path='/reviews_history'
          exact
          render={() => {
            return <EditReviewsPage />;
          }}
        />
        <UserContext.Consumer>
          {user => (
            <Fragment>
              <Route
                path='/signup'
                exact
                render={props => {
                  const { from } = props.location.state;
                  return <SignupLogic setLogin={user.setLogin} from={from} />;
                }}
              />
              <Route
                path='/signin'
                exact
                render={props => {
                  const { from } = props.location.state;
                  return <SigninLogic {...user} from={from} />;
                }}
              />
            </Fragment>
          )}
        </UserContext.Consumer>
        <Route component={NotFound} />
      </Switch>
  );
}

export default AppRouter;
