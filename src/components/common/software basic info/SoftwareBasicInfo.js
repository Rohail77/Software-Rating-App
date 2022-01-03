import SoftwareDetails from './software logo and details/SoftwareDetails';
import SoftwareLogo from './software logo and details/SoftwareLogo';

function SoftwareBasicInfo(props) {
  const { name } = props;
  return (
    <>
      <SoftwareLogo name={name} />
      <SoftwareDetails {...props} />
    </>
  );
}

export default SoftwareBasicInfo;
