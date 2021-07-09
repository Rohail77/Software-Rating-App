import { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainPageLogic from './main/page/MainPageLogic';
import NotFound from './not found page/NotFound';
import SoftwareDetailsRouterLogic from './software details/router/SoftwareDetailsRouterLogic';

class AppRouter extends Component {
  getSoftware(id) {
    const { softwares } = this.props;
    return softwares.find(software => software.id === id);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path='/software_details/:id'
            render={props => {
              const { id } = props.match.params;
              const software = this.getSoftware(id)
              return (
                software ?
                <SoftwareDetailsRouterLogic software={software} /> :
                <NotFound />
              );
            }}
          />
          <Route
            path='/'
            exact
            render={props => {
              return <MainPageLogic {...this.props} />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
