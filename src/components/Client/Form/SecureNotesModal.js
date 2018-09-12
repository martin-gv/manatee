import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class SecureNotesModal extends React.Component {
   render() {
      const { isOpen, toggle, submit, client, onChange } = this.props;

      return (
         <Modal isOpen={isOpen} toggle={() => toggle("secure")} centered>
            <ModalHeader>Secure Notes</ModalHeader>
            <form className="ui form" onSubmit={submit}>
               <ModalBody>
                  <div className="field">
                     <label>Secure Notes</label>
                     <textarea
                        name="secureNotes"
                        value={client.secureNotes}
                        onChange={onChange}
                     />
                  </div>
               </ModalBody>
               <ModalFooter>
                  <button className="ui green button">Save</button>
               </ModalFooter>
            </form>
         </Modal>
      );
   }
}

export default SecureNotesModal;
