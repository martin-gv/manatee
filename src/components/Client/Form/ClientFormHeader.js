import React from "react";

const ClientFormHeader = props => {
   const { client, toggleModal } = props;
   return (
      <div className="ui clearing basic segment">
         <h2 className="ui left floated header">
            {client.firstName} {client.lastName}
            <div className="sub header">
               File Created: 2 years ago | Last Viewed: 3 weeks ago
            </div>
         </h2>
         <button
            className="ui right floated negative icon basic small button"
            onClick={() => toggleModal("secure")}
         >
            <i className="lock icon" />
            Secure Notes
         </button>
         <button className="ui right floated yellow icon basic small button">
            <i className="gift icon" />
            Rewards
         </button>
         <button className="ui right floated green basic small button">
            Infusionsoft
         </button>
         {/* <div className="ui right floated small buttons">
            <button className="ui button active">Personal</button>
            <button className="ui button">Company</button>
         </div> */}
      </div>
   );
};

export default ClientFormHeader;
