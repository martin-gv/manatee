import React from "react";
import moment from "moment";

const ClientFormHeader = props => {
   const { client, company, toggleModal } = props;
   const {
      clientID,
      firstName,
      lastName,
      createdAt,
      updatedAt,
      addButton
   } = client;
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
                  <button className="ui blue basic button" onClick={addButton}>
                     Add Company
                  </button>
               )}
               <button className="ui green basic button">
                  <i className="material-icons">android</i>
                  Infusionsoft
               </button>
               <button
                  className="ui yellow basic button"
                  onClick={() => toggleModal("rewards")}
               >
                  <i className="material-icons">dashboard</i>
                  Rewards
               </button>
               <button
                  className="ui orange basic button"
                  onClick={() => toggleModal("secure")}
               >
                  <i className="material-icons">lock</i>
                  Secure Notes
               </button>
               <button
                  className="ui negative basic button"
                  onClick={() => toggleModal("secure")}
               >
                  <i className="material-icons">delete</i>
                  Delete
               </button>
            </div>
         </div>
      </div>
   );
};

export default ClientFormHeader;
