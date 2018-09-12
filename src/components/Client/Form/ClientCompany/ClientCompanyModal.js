import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

const ClientCompanyModal = props => {
   const { isOpen, toggle, submit, value, onChange } = props;

   return (
      <Modal
         isOpen={isOpen}
         toggle={() => toggle("company")}
         centered
         style={{ maxWidth: "400px" }}
      >
         <ModalHeader>Add Company</ModalHeader>
         <ModalBody>
            <form className="ui form" onSubmit={submit}>
               <div className="ui left icon action fluid input">
                  <input
                     type="text"
                     placeholder="Add by Company ID"
                     value={value}
                     onChange={onChange}
                  />
                  <i className="building icon" />
                  <button className="ui green button">Add Company</button>
               </div>
            </form>
         </ModalBody>
         <ModalFooter>
            <button
               className="ui red basic button"
               onClick={() => toggle("company")}
            >
               Cancel
            </button>
         </ModalFooter>
      </Modal>
   );
};

export default ClientCompanyModal;
