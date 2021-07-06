import { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainLogic from './main/MainLogic';
import Rate from './rate/Rate';
// import Reviews from './reviews/Reviews';
import SoftwareDetailsRouuter from './software details/SoftwareDetailsRouter';

class RouteSelector extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/rate' exact component={Rate} />
          <Route
            path='/software_details/:id'
            component={SoftwareDetailsRouuter}
          />
          {/* <Route path='/reviews' component={Reviews} /> */}
          <Route
            path='/'
            exact
            render={() => {
              return <MainLogic {...this.props} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default RouteSelector;
