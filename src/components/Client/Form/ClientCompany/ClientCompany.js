import React from "react";

const ClientCompany = props => {
   const { addButton, removeButton, viewButton, company } = props;
   const { companyID, name, address1, city } = company;

   return (
      <div className="ui segments">
         <div className="ui segment">
            <div className="ui buttons">
               <button
                  className="ui blue basic button"
                  onClick={addButton}
                  disabled={companyID}
               >
                  Add Company
               </button>
               <button
                  className="ui red basic button"
                  onClick={removeButton}
                  disabled={!companyID}
               >
                  Remove Company
               </button>
            </div>
         </div>
         <div className="ui clearing segment">
            <button
               className="ui right floated mini button"
               onClick={viewButton}
               disabled={!companyID}
            >
               View
            </button>
            <div className="ui list">
               <div className="item">{name}</div>
               <div className="item">{address1}</div>
               <div className="item">{city}</div>
            </div>
         </div>
      </div>
   );
};

export default ClientCompany;
