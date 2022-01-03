import { createPortal } from 'react-dom';

function WaitMessage({ containerId, styles }) {
  const renderElement = (
    <div className='wait-msg' style={styles}>
      <img src='/images/wait.svg' alt='wait icon' />
    </div>
  );

  return (
    <>
      {containerId
        ? createPortal(renderElement, document.getElementById(containerId))
        : renderElement}
    </>
  );
}

export default WaitMessage;
