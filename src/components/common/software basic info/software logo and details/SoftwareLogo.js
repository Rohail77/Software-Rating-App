function SoftwareLogo(props) {
  const { name } = props;

  return (
    <img
      src={`/images/software logos/${name.toLowerCase()}.svg`}
      alt={`${name.toLowerCase()} logo`}
      className='software__logo'
    />
  );
}

export default SoftwareLogo;
