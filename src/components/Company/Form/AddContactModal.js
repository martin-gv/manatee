import React from "react";
import Modal from "../../UI/Shared/Modal";

class AddContactModal extends React.Component {
   render() {
      const { open, toggle, submit, value, onChange } = this.props;

      return (
         <Modal open={open} close={toggle}>
            <h3 style={{ marginBottom: 20 }}>Add Company Contact</h3>
            <form className="ui form" onSubmit={submit}>
               <div className="field">
                  <input
                     type="text"
                     placeholder="Add by Client ID"
                     value={value}
                     onChange={onChange}
                  />
               </div>
               <button className="ui basic green button">Add Contact</button>
            </form>
         </Modal>
      );
   }
}

export default AddContactModal;
