import React from 'react';

function FormError({ error }) {
  return <p className='gateway-form__error'>* {error}</p>;
}

export default FormError;
