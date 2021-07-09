import SoftwareBasicInfo from '../../../../../common/software basic info/SoftwareBasicInfo';

function SoftwareInfo(props) {
  return (
    <section className='software'>
      <SoftwareBasicInfo {...props} />
    </section>
  );
}

export default SoftwareInfo;
