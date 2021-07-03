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
    return softwares.filter(software => {
      return software.name
        .toLocaleLowerCase()
        .includes(this.state.softwareSearchString.toLocaleLowerCase());
    });
  }

  render() {
    return (
      <Main
        softwares={this.getFilteredSoftwares()}
        setSoftwareSearchString={this.setSoftwareSearchString}
      />
    );
  }
}

const softwares = [
  {
    name: 'Visual Studio Code',
    developer: 'Microsoft',
    rating: {
      average: 4.2,
      categories: [
        { type: 5, count: 55 },
        { type: 4, count: 12 },
        { type: 3, count: 8 },
        { type: 2, count: 3 },
        { type: 1, count: 7 },
      ],
    },
    reviews: 75,
  },
  {
    name: 'Figma',
    developer: 'Figma, Inc',
    rating: {
      average: 4.4,
      categories: [
        { type: 5, count: 57 },
        { type: 4, count: 10 },
        { type: 3, count: 8 },
        { type: 2, count: 3 },
        { type: 1, count: 7 },
      ],
    },
    reviews: 98,
  },
  {
    name: 'Skype',
    developer: 'Microsoft',
    rating: {
      average: 3.4,
      categories: [
        { type: 5, count: 54 },
        { type: 4, count: 13 },
        { type: 3, count: 5 },
        { type: 2, count: 2 },
        { type: 1, count: 11 },
      ],
    },
    reviews: 19,
  },
];


export default MainLogic;
