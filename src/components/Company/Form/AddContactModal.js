import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class AddContactModal extends React.Component {
   render() {
      const { isOpen, toggle, submit, value, onChange } = this.props;

      return (
         <Modal
            isOpen={isOpen}
            toggle={toggle}
            centered
            style={{ maxWidth: "400px" }}
         >
            <ModalHeader>Add Company Contact</ModalHeader>
            <form className="ui form" onSubmit={submit}>
               <ModalBody>
                  <div className="ui left icon action fluid input">
                     <input
                        type="text"
                        placeholder="Add by Client ID"
                        value={value}
                        onChange={onChange}
                     />
                     <i className="user icon" />
                     <button className="ui green button">Add Contact</button>
                  </div>
               </ModalBody>
               <ModalFooter>
                  {/* <button className="ui red basic button" onClick={toggle}>
                     Cancel
                  </button> */}
               </ModalFooter>
            </form>
         </Modal>
      );
   }
}

export default AddContactModal;
