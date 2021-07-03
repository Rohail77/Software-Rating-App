import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import MainLogic from './components/main/MainLogic';
import Rate from './components/rate/Rate';
import Reviews from './components/reviews/Reviews';
import SoftwareDetails from './components/software details/SoftwareDetails';

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path='/rate'>
          <Rate />
        </Route>
        <Route path='/software_details' component={SoftwareDetails} />
        <Route path='/reviews' component={Reviews} />
        <Route path='/'>
          <MainLogic />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
