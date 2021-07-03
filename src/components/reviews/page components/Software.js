import SoftwareInfo from "../../common/SoftwareInfo";

function Software(props) {

  return (
    <section className='software'>
      <SoftwareInfo {...props.software}/>
    </section>
  );
}

export default Software
