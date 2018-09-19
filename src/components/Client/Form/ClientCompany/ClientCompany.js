import React from "react";

const ClientCompany = props => {
   const { removeButton, viewButton, company } = props;
   const { companyID, name, address1, city } = company;

   return (
      <div style={{ marginTop: "20px" }}>
         {companyID && (
            <div>
               <button className="ui red basic button" onClick={removeButton}>
                  Remove Company
               </button>
               <button
                  className="ui right floated mini button"
                  onClick={viewButton}
                  disabled={!companyID}
               >
                  View Company
               </button>
            </div>
         )}
         <div className="ui list">
            <div className="item">{name}</div>
            <div className="item">{address1}</div>
            <div className="item">{city}</div>
         </div>
      </div>
   );
};

export default ClientCompany;
