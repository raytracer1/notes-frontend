import React, { PropsWithChildren } from "react";
import { Button, Modal as ReactModal, ModalBody } from 'reactstrap';
import './style.scss';

interface IModalProps {
  isModalOpen: boolean,
  toggleModal: () => void,
  title: string,
}

const Modal = ({
  isModalOpen,
  toggleModal,
  title,
  children,
} : PropsWithChildren<IModalProps> ) => {
  return (
    <ReactModal isOpen={isModalOpen} toggle={toggleModal}>
      <div className='modal-header'>
        <div className='modal-titel'>{title}</div>
        <Button className='btn-close' onClick={toggleModal}>
        </Button>
      </div>
      <ModalBody>
        {children}
      </ModalBody>
    </ReactModal>
  )
}

export default Modal;