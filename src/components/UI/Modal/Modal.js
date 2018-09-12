import React from "react";
import {
   Modal as BootstrapModal,
   ModalBody as BootstrapModalBody,
   ModalHeader as BootstrapModalHeader,
   ModalFooter as BootstrapModalFooter
} from "reactstrap";

// Props: isOpen, toggle, tittle

const Modal = props => {
   return (
      <BootstrapModal isOpen={props.isOpen} toggle={props.toggle}>
         <BootstrapModalHeader>{props.title}</BootstrapModalHeader>
         <BootstrapModalBody>{props.children}</BootstrapModalBody>
         <BootstrapModalFooter>
            <button onClick={props.toggle} className="btn btn-primary">
               Okay
            </button>
         </BootstrapModalFooter>
      </BootstrapModal>
   );
};

export default Modal;
