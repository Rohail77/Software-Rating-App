import SoftwareDetails from './software logo and details/SoftwareDetails';
import SoftwareLogo from './software logo and details/SoftwareLogo';
import { Fragment  } from 'react';

function SoftwareBasicInfo(props) {
  const { name } = props;
  return (
    <Fragment>
      <SoftwareLogo name={name} />
      <SoftwareDetails {...props} />
    </Fragment>
  );
}

export default SoftwareBasicInfo;
