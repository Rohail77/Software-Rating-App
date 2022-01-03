import { useEffect } from 'react';

function FilterRatingForm(props) {
  const handleChange = event => props.filterReviews(event.target.value);

  useEffect(() => {
    props.filterReviews('all');
  }, []);

  return (
    <form className='filter-rating-form'>
      <div>
        <label htmlFor='category'>Stars</label>
        <select
          name='category'
          id='category'
          onChange={handleChange}
          value={props.category}
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

export default FilterRatingForm;
