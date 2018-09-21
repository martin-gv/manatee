import React from "react";
import Modal from "../../../UI/Shared/Modal";

const ClientCompanyModal = props => {
   const { open, close, submit, value, onChange } = props;

   return (
      <Modal open={open} close={() => close("company")}>
         <h3>Add Company</h3>
         <form className="ui form" style={{ marginTop: 20 }} onSubmit={submit}>
            <div className="field">
               <input
                  type="text"
                  placeholder="Add by Company ID"
                  value={value}
                  onChange={onChange}
               />
            </div>
            <button className="ui blue button">Add Company</button>
         </form>
      </Modal>
   );
};

export default ClientCompanyModal;
