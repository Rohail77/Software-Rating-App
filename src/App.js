import { Component } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { db } from './database/Database';
import { UserContext } from './context/userContext';
import { authorization } from './components/gateway/auth/Authorization';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      softwares: [],
      onWait: true,
      loggedin: false
    };
    this.updateSoftware = this.updateSoftware.bind(this);
    this.setLogin = this.setLogin.bind(this);
  }

  setLogin(value) {
    this.setState({
      loggedin: value,
    });
  }

  componentDidMount() {
    db.getSoftwares(softwares =>
      this.setState({
        softwares: softwares,
        onWait: false,
      })
    );
    db.onSoftwareUpdate(this.updateSoftware);
    authorization.onLoginDetection(this.setLogin);
  }

  updateSoftware(updatedSoftware) {
    this.setState(state => ({
      softwares: state.softwares.map(software => {
        return software.id === updatedSoftware.id ? updatedSoftware : software;
      }),
    }));
  }

  render() {
    const { loggedin } = this.state;

    return (
      <Router>
        <UserContext.Provider value={{ loggedin, setLogin: this.setLogin }}>
          <AppRouter {...this.state} />
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
