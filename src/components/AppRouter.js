import { Route, Switch } from 'react-router-dom';
import AccountPage from './account/page/AccountPage';
import MainPageLogic from './main/page/MainPageLogic';
import NotFound from './not found page/NotFound';
import SoftwareDetailsRouterLogic from './software details/router/SoftwareDetailsRouterLogic';
import RatedAppsContextConsumer from './rated apps/page/RatedAppsContextConsumer';
import SigninLogic from './gateway/pages/sign in/SigninLogic';
import SignupLogic from './gateway/pages/sign up/SignupLogic';

function AppRouter(props) {
  const { onWait, softwares } = props;

  const getSoftware = id => softwares.find(software => software.id === id);

  return (
    <Switch>
      <Route
        path='/'
        exact
        render={() => {
          return <MainPageLogic onWait={onWait} softwares={softwares} />;
        }}
      />

      <Route
        path='/rated_apps'
        exact
        render={() => {
          return <RatedAppsContextConsumer />;
        }}
      />

      <Route
        path='/account'
        exact
        render={() => {
          return <AccountPage />;
        }}
      />

      <Route
        path='/signup'
        exact
        render={props => {
          const { from } = props.location.state;
          return <SignupLogic from={from} />;
        }}
      />

      <Route
        path='/signin'
        exact
        render={props => {
          const { from } = props.location.state;
          return <SigninLogic from={from} />;
        }}
      />

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

      <Route component={NotFound} />
    </Switch>
  );
}

export default AppRouter;
