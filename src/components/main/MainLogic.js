import { Component } from 'react';
import Main from './Main';

class MainLogic extends Component {
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
    const { softwares} = this.props;

    return softwares.filter(software => {
      return software.name
        .toLocaleLowerCase()
        .includes(softwareSearchString.toLocaleLowerCase());
    });
  }

  render() {

    const {getReviews} = this.props;

    return (
      <Main
        softwares={this.getFilteredSoftwares()}
        setSoftwareSearchString={this.setSoftwareSearchString}
        getReviews={getReviews}
      />
    );
  }
}

export default MainLogic;
