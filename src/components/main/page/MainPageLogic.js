import { Component } from 'react';
import MainPage from './MainPage';

class MainPageLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      softwareSearchString: '',
    };
    this.data = {
      softwaresPerPage: 20,
    };
    this.setSoftwareSearchString = this.setSoftwareSearchString.bind(this);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
  }

  updateCurrentPage(newPageNumber) {
    this.setState({
      currentPage: newPageNumber,
    });
  }

  setSoftwareSearchString(string) {
    this.setState({
      softwareSearchString: string,
      currentPage: 1,
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
    const { onWait } = this.props;
    const { currentPage } = this.state;
    const { softwaresPerPage } = this.data;

    return (
      <MainPage
        softwares={this.getFilteredSoftwares()}
        setSoftwareSearchString={this.setSoftwareSearchString}
        onWait={onWait}
        updateCurrentPage={this.updateCurrentPage}
        currentPage={currentPage}
        softwaresPerPage={softwaresPerPage}
      />
    );
  }
}

export default MainPageLogic;
