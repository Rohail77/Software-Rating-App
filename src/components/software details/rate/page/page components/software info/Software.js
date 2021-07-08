import React from 'react'
import SoftwareBasicInfo from '../../../../../common/software basic info/SoftwareBasicInfo';

function Software(props) {

  const {name, developer} = props;

  return (
    <section className='software'>
      <SoftwareBasicInfo name={name} developer={developer} />
    </section>
  );
}

export default Software
