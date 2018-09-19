import React from "react";

const PrimaryContact = props => {
   const { clientID, firstName, lastName, phone, email } = props;
   const { removeButton } = props;

   return (
      <div className="section">
         <div style={{ marginBottom: 10 }}>Primary Contact</div>
         <div>
            {firstName} {lastName}
         </div>
         <div>{phone}</div>
         <div>{email}</div>
         <button
            className="ui basic red button"
            disabled={!clientID}
            onClick={removeButton}
         >
            Remove
         </button>
      </div>
   );
};

export default PrimaryContact;
