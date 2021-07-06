import { Component } from 'react';
import './App.css';
import RouteSelector from './components/RouteSelector';
import { db } from './database/Database';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      softwares: [],
    };
    this.getReviews = this.getReviews.bind(this);
  }

  getReviews(id) {
    db.getReviews(id, reviews => console.log(reviews));
  }

  componentDidMount() {
    db.getSoftwares(softwares =>
      this.setState({
        softwares: softwares,
      })
    );
  }

  render() {
    const { softwares, reviews } = this.state;

    return (
      <RouteSelector
        softwares={softwares}
        getReviews={this.getReviews}
        reviews={reviews}
      />
    );
  }
}

export default App;
