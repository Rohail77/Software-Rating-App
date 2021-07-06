import { Component } from 'react';

class FilterRatingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      this.filterReviews
    );
  }

  filterReviews() {
    const { category } = this.state;
    this.props.filterReviews(category);
  }

  render() {
    return (
      <form className='filter-rating-form'>
        <div>
          <label htmlFor='category'>Stars</label>
          <select
            name='category'
            id='category'
            onChange={this.handleChange}
            value={this.state.category}
          >
            <option value='all'>All</option>
            <option value='5'>
              5 &nbsp;&nbsp; &#9733; &#9733; &#9733; &#9733; &#9733;
            </option>
            <option value='4'>
              4 &nbsp;&nbsp; &#9733; &#9733; &#9733; &#9733;
            </option>
            <option value='3'>3 &nbsp;&nbsp; &#9733; &#9733; &#9733;</option>
            <option value='2'>2 &nbsp;&nbsp; &#9733; &#9733;</option>
            <option value='1'>1 &nbsp;&nbsp; &#9733;</option>
          </select>
        </div>
      </form>
    );
  }
}

export default FilterRatingForm;
