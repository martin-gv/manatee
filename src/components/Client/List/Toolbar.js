import React from "react";

// import ClientSearch from "../Search";
// import ClientSearchByTag from "../SearchByTag";

const Toolbar = props => {
   return (
      <div className="ui grid">
         <div className="five wide column">
            {/* <ClientSearch /> */}
            <h2>Clients</h2>
         </div>
         <div className="eleven wide column" style={{ textAlign: "right" }}>
            {/* <ClientSearchByTag data={props.tagData} /> */}
            <button
               className="ui blue button"
               onClick={() => props.toggleModal("newClientModal")}
            >
               New Client
            </button>
         </div>
      </div>
   );
};

export default Toolbar;
