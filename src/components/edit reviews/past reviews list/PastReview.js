import { Component } from 'react'

class PastReview extends Component {
  render() {
    return (
      <li className='past-review'>
        <div className='past-review__basic-info-and-ctas'>
          <div className='past-review__software'>
            <img
              src={`/images/software logos/firefox.svg`}
              alt={`firefox logo`}
              className='software__logo'
            />
            <div className='software__details'>
              <p className='software__name'>Firefox</p>
              <p className='software__review-date'>15/05/2021</p>
            </div>
          </div>
          <div className='past-review__ctas'>
            <a href='edit' className='edit-btn'>
              <img src='/images/edit.svg' alt='pencil' />
            </a>
            <a href='delete'>
              <img src='/images/delete.svg' alt='dustbin' />
            </a>
            {/* <a href='save' className='save-btn'>
                Save
              </a>
              <a href='cancel' className='cancel-btn'>
                Cancel
              </a> */}
          </div>
        </div>
        <ul className='stars-list'>
          <li className='star'>
            <a href='a'>
              <img src={`/images/red star.svg`} alt='red star' />
            </a>
          </li>
          <li className='star'>
            <a href='a'>
              <img src={`/images/red star.svg`} alt='red star' />
            </a>
          </li>
          <li className='star'>
            <a href='a'>
              <img src={`/images/red star.svg`} alt='red star' />
            </a>
          </li>
          <li className='star'>
            <a href='a'>
              <img src={`/images/red star.svg`} alt='red star' />
            </a>
          </li>
          <li className='star'>
            <a href='a'>
              <img src={`/images/red star.svg`} alt='red star' />
            </a>
          </li>
        </ul>
        <textarea
          className='past-review__text'
          value='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae faucibus ullamcorper pretium vivamus. Tempus lobortis lectus fames id ut a Vestibulum, lectus sed quisque sit habitant. Vitae dictum tristique aliquet elementum diam vestibulum et at cras.'
        ></textarea>
      </li>
    );
  }
}

export default PastReview
