import Stars from '../../../../common/stars list/Stars';
import { Link } from 'react-router-dom';
import SoftwareBasicInfo from '../../../../common/software basic info/SoftwareBasicInfo';

function software(props) {
  const { name, developer, average_rating, id } = props.software;
  return (
    <li className='software'>
      <Link to={`/software_details/${id}`}>
        <SoftwareBasicInfo name={name} developer={developer} />
        <Stars averageRating={average_rating} />
      </Link>
    </li>
  );
}

export default software;
