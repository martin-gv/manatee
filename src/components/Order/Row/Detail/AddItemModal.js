import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class AddItemModal extends React.Component {
   render() {
      const { isOpen, toggle, submit } = this.props;

      return (
         <Modal
            isOpen={isOpen}
            toggle={toggle}
            centered
            style={{ maxWidth: "400px" }}
         >
            <ModalHeader>Add Inventory Item</ModalHeader>
            <ModalBody>
               <form
                  className="ui form"
                  onSubmit={e => submit(e, this.inputID.value)}
               >
                  <div className="ui action fluid input">
                     <input
                        type="text"
                        placeholder="Add by Inventory ID"
                        ref={el => (this.inputID = el)}
                        // required="true"
                     />
                     <button className="ui green button">Add Item</button>
                  </div>
               </form>
            </ModalBody>
            <ModalFooter />
         </Modal>
      );
   }
}

export default AddItemModal;
