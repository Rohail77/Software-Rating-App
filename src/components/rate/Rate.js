function Rate() {
  return (
    <div className='wrapper rate-wrapper'>
      <div className='breadcrumbs'>
        <a href='/'>Home</a>
        <span> \ </span>
        <a href='/software_details' className='page-link'>
          Visual Studio Code
        </a>
        <span> \ </span>
        <a href='/rate' className='page-link active-page-link'>
          Rate
        </a>
      </div>

      <section classv='software'>
        <img
          src='images/vscode.svg'
          alt='visual Studio code logo'
          className='software__logo'
        />
        <div className='software__details'>
          <p className='software__name'>Visual Studio Code</p>
          <p className='software__developer'>Microsoft</p>
        </div>
      </section>

      <div className='rate'>
        <h2>Rate</h2>
        <ul className='stars-list'>
          <li>
            <a href='a'>
              <img
                className='star white-star'
                src='images/white_star.svg'
                alt='white star'
              />
            </a>
          </li>
          <li>
            <a href='a'>
              <img
                className='star white-star'
                src='images/white_star.svg'
                alt='white star'
              />
            </a>
          </li>
          <li>
            <a href='a'>
              <img
                className='star white-star'
                src='images/white_star.svg'
                alt='white star'
              />
            </a>
          </li>
          <li>
            <a href='a'>
              <img
                className='star white-star'
                src='images/white_star.svg'
                alt='white star'
              />
            </a>
          </li>
          <li>
            <a href='a'>
              <img
                className='star white-star'
                src='images/white_star.svg'
                alt='white star'
              />
            </a>
          </li>
        </ul>
      </div>

      <form action='' className='review-form'>
        <div>
          <label for='review'> Write a review (optional) </label>
          <textarea
            name='review'
            id='review'
            placeholder='Tell us your experience with the app'
          ></textarea>
        </div>
        <div>
          <label for='name'> Your name </label>
          <input type='text' name='name' id='name' />
        </div>
        <button type='submit' className='submit-btn'>
          Submit
        </button>
      </form>

      <div className='confirmation-modal'>
        <p>Thanks for your feedback! Your feedback is very helpful.</p>
        <a href='/'>Exit</a>
      </div>
    </div>
  );
}

export default Rate;
