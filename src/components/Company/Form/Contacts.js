import React from "react";

const Contacts = props => {
   const { addButton, removeButton, makePrimaryButton } = props;
   const contacts = props.contacts.map(el => (
      <div key={el._id}>
         {el.clientId} {el.firstName} {el.lastName}{" "}
         <button
            className="ui mini green basic button"
            onClick={() => makePrimaryButton(el)}
         >
            Primary
         </button>
         <button
            className="ui mini basic icon button"
            onClick={() => removeButton(el._id)}
         >
            <i className="trash icon" />
         </button>
      </div>
   ));

   return (
      <div className="ui card">
         <div className="content">
            <div className="meta">Company Contacts</div>
            {contacts}
         </div>
         <div className="extra content">
            <div className="ui two buttons">
               <button className="ui basic green button" onClick={addButton}>
                  Add New
               </button>
            </div>
         </div>
      </div>
   );
};

export default Contacts;
