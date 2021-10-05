import { useState } from 'react';
import ReactDOM from 'react-dom';

// I use renderProps pattern here to make encapsulate modal logic only in modal component
const Modal = ({ children, renderOpener }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const open = () => {
    setModalOpen(true);
    document.querySelector('body').style.overflow = 'hidden';
  };

  const close = () => {
    document.querySelector('body').style.overflow = 'visible';
    setModalOpen(false);
  };

  return (
    <>
      {renderOpener(open)}
      {modalOpen &&
        ReactDOM.createPortal(
          <div
            className='backdrop'
            style={{ top: -window.screenY }}
            onClick={close}
          >
            <div className='modal'>{children}</div>
          </div>,
          document.querySelector('#modal')
        )}
    </>
  );
};

export default Modal;
