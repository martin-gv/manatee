import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class AddToInvoiceModal extends React.Component {
   state = {
      id: ""
   };

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   render() {
      const { id } = this.state;
      const { isOpen, toggle, addToOrder } = this.props;

      return (
         <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader>Add to Order</ModalHeader>
            <ModalBody>
               <form onSubmit={e => addToOrder(e, id)}>
                  <div className="form-group">
                     <label>Invoice #</label>
                     <input
                        className="form-control"
                        name="id"
                        value={id}
                        onChange={this.handleChange}
                     />
                  </div>
                  <button className="btn btn-primary">Add to Order</button>
               </form>
            </ModalBody>
            <ModalFooter>
               <button onClick={toggle} className="btn btn-outline-danger">
                  Cancel
               </button>
            </ModalFooter>
         </Modal>
      );
   }
}

export default AddToInvoiceModal;
