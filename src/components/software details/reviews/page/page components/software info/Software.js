import SoftwareBasicInfo from '../../../../../common/software basic info/SoftwareBasicInfo';

function Software(props) {

  return (
    <section className='software'>
      <SoftwareBasicInfo {...props.software} />
    </section>
  );
}

export default Software
