import React from "react";

const Contacts = props => {
   const { addButton, removeButton, makePrimaryButton } = props;
   const contacts = props.contacts.map(el => (
      <div
         key={el._id}
         style={{ display: "flex", alignItems: "center" }}
      >
         <button
            className="ui mini basic button"
            style={{
               minWidth: 0,
               padding: 8,
               display: "flex",
               margin: 0,
               boxShadow: "none"
            }}
            onClick={() => removeButton(el._id)}
         >
            <i
               className="material-icons"
               style={{ margin: 0, fontSize: 13, color: "#db2828" }}
            >
               close
            </i>
         </button>
         <span>
            <span
               style={{
                  color: "#888",
                  marginRight: 10,
                  display: "inline-block",
                  minWidth: 27
               }}
            >
               {el.clientID}
            </span>
            <span style={{ fontSize: 16 }}>
               {el.firstName} {el.lastName}
            </span>
         </span>
         <button
            className="ui mini basic button"
            style={{
               marginLeft: 12,
               boxShadow: "none",
               minWidth: 0,
               padding: 0
            }}
            onClick={() => makePrimaryButton(el)}
         >
            Make Primary
         </button>
      </div>
   ));

   return (
      <div className="section" style={{marginRight: 0}}>
         <h4 style={{ marginBottom: 20 }}>Company Contacts</h4>
         {contacts}
         <hr />
         <button className="ui basic green button" onClick={addButton}>
            <i className="material-icons">person_add</i>
            Add Contact
         </button>
      </div>
   );
};

export default Contacts;
