import React from "react";
import Modal from "../../UI/Shared/Modal";

const SecureNotesModal = props => {
   const { open, close, submit, client, onChange } = props;
   return (
      <Modal open={open} close={() => close("secure")}>
         <h3>Secure Notes</h3>
         <form className="ui form" onSubmit={submit}>
            <div className="field">
               <textarea
                  name="secureNotes"
                  value={client.secureNotes}
                  onChange={({ target }) =>
                     onChange("secureNotes", target.value)
                  }
               />
            </div>
            <button className="ui green basic button">Save</button>
         </form>
      </Modal>
   );
};

export default SecureNotesModal;
