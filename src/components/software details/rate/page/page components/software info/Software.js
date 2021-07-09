import SoftwareBasicInfo from '../../../../../common/software basic info/SoftwareBasicInfo';

function Software({name, developer}) {
  return (
    <section className='software'>
      <SoftwareBasicInfo name={name} developer={developer} />
    </section>
  );
}

export default Software
