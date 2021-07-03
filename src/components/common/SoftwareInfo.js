import SoftwareDetails from './SoftwareDetails';
import SoftwareLogo from './SoftwareLogo';
import { Fragment  } from 'react';

function SoftwareInfo(props) {
  const { name } = props;

  return (
    <Fragment>
      <SoftwareLogo name={name} />
      <SoftwareDetails {...props} />
    </Fragment>
  );
}

export default SoftwareInfo;
