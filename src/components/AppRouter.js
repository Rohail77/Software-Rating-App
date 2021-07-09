import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainPageLogic from './main/page/MainPageLogic';
import NotFound from './not found page/NotFound';
import SoftwareDetailsRouterLogic from './software details/router/SoftwareDetailsRouterLogic';

function AppRouter(props) {
  function getSoftware(id) {
    const { softwares } = props;
    return softwares.find(software => software.id === id);
  }

  return (
    <Router>
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
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
