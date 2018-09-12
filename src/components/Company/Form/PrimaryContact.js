import React from "react";

const PrimaryContact = props => {
   const { clientId, firstName, lastName, phone, email } = props;
   const { removeButton } = props;

   return (
      <div className="ui card">
         <div className="content">
            <div className="header">
               {firstName} {lastName}
            </div>
            <div className="meta">Primary Contact</div>
            <div>{phone}</div>
            <div>{email}</div>
         </div>
         <div className="extra content">
            <div className="ui two buttons">
               {/* <button
                  className="ui basic green button"
                  disabled={true}
                  onClick={addButton}
               >
                  Add New
               </button> */}
               <button
                  className="ui basic red button"
                  disabled={!clientId}
                  onClick={removeButton}
               >
                  Remove
               </button>
            </div>
         </div>
      </div>
   );
};

export default PrimaryContact;
