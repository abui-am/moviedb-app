import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
  it('should be able to function correctly', () => {
    render(
      <>
        <Modal renderOpener={(open) => <button onClick={open}>Open Me</button>}>
          This is content
        </Modal>
        <div id='modal' />
      </>
    );

    // The body will be hidden
    expect(screen.queryAllByText(/This is content/).length).toBe(0);

    const button = screen.getByText(/Open Me/);
    fireEvent.click(button);

    expect(screen.getByText(/This is content/)).toBeVisible();
  });

  it('should block body scroll if modal is open', () => {
    render(
      <>
        <Modal renderOpener={(open) => <button onClick={open}>Open Me</button>}>
          This is content
        </Modal>
        <div id='modal' />
      </>
    );

    const button = screen.getByText(/Open Me/);
    fireEvent.click(button);

    expect(document.querySelector('body').style.overflow).toBe('hidden');
  });
});
