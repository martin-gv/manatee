import React from "react";

const PrimaryContact = props => {
   const { clientID, firstName, lastName, phone, email } = props;

   return (
      <div className="section">
         <h4 style={{ marginBottom: 20 }}>Primary Contact</h4>
         <div style={{ fontWeight: 600 }}>
            {firstName} {lastName}
         </div>
         <div>{phone}</div>
         <div>{email}</div>
         <hr />

         <button
            className="ui basic red button"
            disabled={!clientID}
            onClick={props.remove}
         >
            Remove
         </button>
      </div>
   );
};

export default PrimaryContact;
