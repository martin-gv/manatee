import React from "react";
import { Modal as BootstrapModal } from "reactstrap";

const ModalWrapper = props => (
   <BootstrapModal isOpen={props.isOpen} toggle={props.toggle}>
      {props.children}
   </BootstrapModal>
);

export default ModalWrapper;
