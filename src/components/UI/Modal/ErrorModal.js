import React from "react";
import { connect } from "react-redux";
import {
   Modal as BootstrapModal,
   ModalBody as BootstrapModalBody,
   ModalHeader as BootstrapModalHeader,
   ModalFooter as BootstrapModalFooter
} from "reactstrap";

import { removeError } from "../../../store/actions/errors";

class ErrorModal extends React.Component {
   render() {
      const { error, removeError } = this.props;

      return (
         <BootstrapModal isOpen={!!error} toggle={removeError}>
            <BootstrapModalHeader>Error</BootstrapModalHeader>
            <BootstrapModalBody>{error}</BootstrapModalBody>
            <BootstrapModalFooter>
               <button onClick={removeError} className="btn btn-primary">
                  Okay
               </button>
            </BootstrapModalFooter>
         </BootstrapModal>
      );
   }
}

function mapStateToProps(state) {
   return {
      error: state.errors.message
   };
}

export default connect(
   mapStateToProps,
   { removeError }
)(ErrorModal);
