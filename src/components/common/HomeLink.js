import { Link } from 'react-router-dom';

function HomeLink(props) {
  const { isActive } = props;

  return (
    <Link
      className={`page-link${isActive ? ' active-page-link' : ''}`}
      to={{
        pathname: '/',
      }}
    >
      Home
    </Link>
  );
}

export default HomeLink;
