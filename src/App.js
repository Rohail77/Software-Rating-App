import { Component } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { db } from './database/Database';
import { UserContext } from './context/userContext';
import {authorization} from './components/gateway/auth/Authorization'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      softwares: [],
      onWait: true,
      loggedin: authorization.loggedin
    };
    this.onSoftwareUpdate = this.onSoftwareUpdate.bind(this);
    this.setLogin = this.setLogin.bind(this);
  }

  setLogin(value) {
    this.setState({
      loggedin: value,
    });
  }

  componentDidMount() {
    db.getSoftwares(
      softwares =>
        this.setState({
          softwares: softwares,
          onWait: false,
        }),
      this.onSoftwareUpdate
    );
  }

  onSoftwareUpdate(updatedSoftware) {
    this.setState(state => {
      return {
        softwares: state.softwares.map(software => {
          return software.id === updatedSoftware.id
            ? updatedSoftware
            : software;
        }),
      };
    });
  }

  render() {
    const { loggedin } = this.state;

    return (
      <UserContext.Provider value={{ loggedin, setLogin: this.setLogin }}>
        <AppRouter {...this.state} />
      </UserContext.Provider>
    );
  }
}

export default App;
