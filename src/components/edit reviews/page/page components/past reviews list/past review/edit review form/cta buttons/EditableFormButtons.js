function EditableFormButtons() {
  const save = event => {
    event.preventDefault();
    const { handleSubmit } = this.props;
    handleSubmit();
  };

  const reset = event => {
    event.preventDefault();
    const { reset } = this.props;
    reset();
  };

  return (
    <div className='past-review__ctas'>
      <a href='cancel' className='cancel-btn' onClick={reset}>
        Cancel
      </a>
      <a href='save' className='save-btn' onClick={save}>
        Save
      </a>
    </div>
  );
}

export default EditableFormButtons;
