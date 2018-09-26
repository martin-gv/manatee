import React from "react";
import moment from "moment";

const ClientFormHeader = props => {
   const { client, company, toggleModal } = props;
   const { clientID, firstName, lastName, createdAt, updatedAt } = client;
   const { companyID } = company;

   return (
      <div className="ui grid" style={{ marginBottom: "-10px" }}>
         <div className="six wide column">
            <h2>{firstName + " " + lastName}</h2>
            <div className="sub header">
               Client ID: {clientID}
               <br />
               Created: {moment(createdAt).fromNow()} | Updated:{" "}
               {moment(updatedAt).fromNow()}
            </div>
         </div>
         <div className="ten wide column">
            <div style={{ display: "inline-block", float: "right" }}>
               {!companyID && (
                  <button
                     className="ui blue basic button"
                     onClick={() => toggleModal("company")}
                  >
                     <i className="building icon" />
                     Add Company
                  </button>
               )}
               <button className="ui green basic button" disabled={true}>
                  Infusionsoft
               </button>
               <button
                  className="ui yellow basic button"
                  onClick={() => toggleModal("rewards")}
               >
                  <i className="gift icon" />
                  Rewards
               </button>
               <button
                  className="ui red basic button"
                  onClick={() => toggleModal("secure")}
               >
                  <i className="material-icons">lock</i>
                  Secure Notes
               </button>
               <button className="ui negative basic button" disabled={true}>
                  <i className="material-icons">delete</i>
                  Delete
               </button>
            </div>
         </div>
      </div>
   );
};

export default ClientFormHeader;
