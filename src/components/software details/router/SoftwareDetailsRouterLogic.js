import { Component } from 'react';

import { db } from '../../../database/Database';
import SoftwareDetailsRouter from './SoftwareDetailsRouter';

class SoftwareDetailsRouterLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      dataFetched: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.software;
    db.getReviews(id, reviews => {
      this.setState({
        reviews,
        dataFetched: true,
      });
    });
  }

  render() {
    return <SoftwareDetailsRouter {...this.props} {...this.state} />;
  }
}

export default SoftwareDetailsRouterLogic;
