function EditableFormButtons({ reset, handleSubmit }) {
  const save = event => {
    event.preventDefault();
    handleSubmit();
  };

  const _reset = event => {
    event.preventDefault();
    reset();
  };

  return (
    <div className='past-review__ctas'>
      <a href='cancel' className='cancel-btn' onClick={_reset}>
        Cancel
      </a>
      <a href='save' className='save-btn' onClick={save}>
        Save
      </a>
    </div>
  );
}

export default EditableFormButtons;
