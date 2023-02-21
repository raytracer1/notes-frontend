import React, { PropsWithChildren } from "react";
import { Button, Modal, ModalBody } from 'reactstrap';
import './style.scss';

interface IModalWrapperProps {
  isModalOpen: boolean,
  toggleModal: () => void,
  title: string,
}

const ModalWrapper = ({
  isModalOpen,
  toggleModal,
  title,
  children,
} : PropsWithChildren<IModalWrapperProps> ) => {
  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <div className="modal-header">
        <div className="modal-titel">{title}</div>
        <Button className="btn-close" onClick={toggleModal}>
          <span>x</span>
        </Button>
      </div>
      <ModalBody>
        {children}
      </ModalBody>
    </Modal>
  )
}

export default ModalWrapper;