
function Software(props) {

  const {software} = props; 

  return (
    <section className='software'>
      <img
        src={`images/software logos/${software.name.toLowerCase()}.svg`}
        alt='visual Studio code logo'
        className='software__logo'
      />
      <div className='software__details'>
        <p className='software__name'>{software.name}</p>
        <p className='software__developer'>{software.developer}</p>
      </div>
    </section>
  );
}

export default Software
