import { Component } from 'react';
import MainPage from './MainPage';

class MainPageLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      softwareSearchString: '',
    };
    this.setSoftwareSearchString = this.setSoftwareSearchString.bind(this);
  }

  setSoftwareSearchString(string) {
    this.setState({
      softwareSearchString: string,
    });
  }

  getFilteredSoftwares() {
    const { softwareSearchString } = this.state;
    const { softwares } = this.props;

    return softwareSearchString === ''
      ? softwares
      : softwares.filter(software => {
          return software.name
            .toLocaleLowerCase()
            .includes(softwareSearchString.toLocaleLowerCase());
        });
  }

  render() {

    const {onWait} = this.props;

    return (
      <MainPage
        softwares={this.getFilteredSoftwares()}
        setSoftwareSearchString={this.setSoftwareSearchString}
        onWait={onWait}
      />
    );
  }
}

export default MainPageLogic;
