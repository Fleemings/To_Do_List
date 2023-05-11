import * as React from 'react';
import Modal from 'react-bootstrap/Modal';

export interface IModalsProps {
  children: React.ReactNode;
  show: boolean;
  handleShowModal: (display: boolean) => void;
}

export default function Modals({
  children,
  show,
  handleShowModal,
}: IModalsProps) {
  return (
    <>
      <Modal show={show} onHide={() => handleShowModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
