import { Component } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { db } from './database/Database';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      softwares: [],
      onWait: true
    };
    this.onSoftwareUpdate = this.onSoftwareUpdate.bind(this);
  }

  componentDidMount() {
    db.getSoftwares(
      softwares =>
        this.setState({
          softwares: softwares,
          onWait: false
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
    const { softwares, onWait } = this.state;

    return <AppRouter softwares={softwares} onWait={onWait}/>;
  }
}

export default App;
