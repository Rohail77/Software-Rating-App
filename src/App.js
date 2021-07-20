import { Component } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { softwares } from './database/Softwares';
import { authorization } from './components/gateway/auth/Authorization';
import { BrowserRouter as Router } from 'react-router-dom';
import { user } from './database/User';
import { UserReviewsContext } from './context/UserReviewsContext';
import { UpdateSoftwareContext } from './context/UpdateSoftwareContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      softwares: [],
      onWait: true,
      loggedin: false,
      userReviews: [],
      fetchingUserReviews: false,
    };
    this.updateSoftware = this.updateSoftware.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getUserReviews = this.getUserReviews.bind(this);
  }

  componentDidMount() {
    softwares.getSoftwares(softwares =>
      this.setState({
        softwares: softwares,
        onWait: false,
      })
    );
    authorization.onLoginDetection(this.handleLogin);
  }

  updateSoftware(id) {
    softwares.getSoftware(id, updatedSoftware => {
      this.setState(state => ({
        softwares: state.softwares.map(software => {
          return software.id === updatedSoftware.id
            ? updatedSoftware
            : software;
        }),
      }));
    });
  }

  handleLogin(loggedin) {
    if (loggedin) user.set();
    this.setState(
      {
        loggedin,
      },
      () => {
        if (this.state.loggedin) {
          this.getUserReviews();
          user.bindUpdaterToReviews(this.getUserReviews);
        }
      }
    );
  }

  getUserReviews() {
    this.setState({
      fetchingUserReviews: true,
    });
    user.getReviews(userReviews => {
      this.setState({
        userReviews,
        fetchingUserReviews: false,
      });
    });
  }

  render() {
    return (
      <Router>
        <UserReviewsContext.Provider
          value={{
            userReviews: this.state.userReviews,
            fetchingUserReviews: this.state.fetchingUserReviews,
            getUpdatedUserReviews: this.getUserReviews,
          }}
        >
          <UpdateSoftwareContext.Provider value={this.updateSoftware}>
            <AppRouter {...this.state} />
          </UpdateSoftwareContext.Provider>
        </UserReviewsContext.Provider>
      </Router>
    );
  }
}

export default App;
