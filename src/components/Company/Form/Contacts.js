import React from "react";

const Contacts = props => {
   const { addButton, removeButton, makePrimaryButton } = props;
   const contacts = props.contacts.map(el => (
      <div key={el._id}>
         {el.clientID} {el.firstName} {el.lastName}{" "}
         <button
            className="ui mini green basic button"
            onClick={() => makePrimaryButton(el)}
         >
            Primary
         </button>
         <button
            className="ui mini basic button"
            onClick={() => removeButton(el._id)}
         >
            <i className="material-icons">delete</i>
         </button>
      </div>
   ));

   return (
      <div className="section">
         <div style={{ marginBottom: 10 }}>Company Contacts</div>
         {contacts}
         <button className="ui basic green button" onClick={addButton}>
            <i className="material-icons">person_add</i>
            Add Contact
         </button>
      </div>
   );
};

export default Contacts;
