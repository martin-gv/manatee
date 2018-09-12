import React from "react";
import { connect } from "react-redux";
import {
   Modal as BootstrapModal,
   ModalBody as BootstrapModalBody,
   ModalHeader as BootstrapModalHeader,
   ModalFooter as BootstrapModalFooter
} from "reactstrap";

import { toggleModalV2 } from "../../../store/actions/system";

class Modal extends React.Component {
   handleToggle = () => {
      this.props.toggleModalV2(false);
   };

   render() {
      return (
         <BootstrapModal isOpen={this.props.isOpen} toggle={this.handleToggle}>
            <BootstrapModalHeader>{this.props.title}</BootstrapModalHeader>
            <BootstrapModalBody>{this.props.message}</BootstrapModalBody>
            <BootstrapModalFooter>
               <button onClick={this.handleToggle} className="btn btn-primary">
                  Okay
               </button>
            </BootstrapModalFooter>
         </BootstrapModal>
      );
   }
}

function mapStateToProps(state) {
   return {
      isOpen: state.system.modal.isOpen,
      title: state.system.modal.title,
      message: state.system.modal.message
   };
}

export default connect(
   mapStateToProps,
   { toggleModalV2 }
)(Modal);
