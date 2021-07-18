function NonEditableFormButtons({ clickable }) {
  const edit = event => {
    event.preventDefault();
    const { setEditable } = this.props;
    setEditable(true);
  };

  const del = event => {
    event.preventDefault();
    const { handleDelete } = this.props;
    handleDelete();
  };

  return (
    <div className='past-review__ctas'>
      <a href='edit' className='edit-btn tooltip' onClick={edit}>
        <img src='/images/edit.svg' alt='pencil' />
        <span className='tooltip-text'>Edit</span>
      </a>
      <a href='delete' className='delete-btn tooltip' onClick={del}>
        <img src='/images/delete.svg' alt='dustbin' />
        <span className='tooltip-text'>Delete</span>
      </a>
      {clickable ? null : <div className='past-review__ctas__wrapper'> </div>}
    </div>
  );
}

export default NonEditableFormButtons;
