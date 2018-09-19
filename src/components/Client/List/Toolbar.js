import React from "react";

import ClientSearch from "../Search";
import ClientSearchByTag from "../SearchByTag";

const Toolbar = props => {
   return (
      <div className="row">
         <div className="col">
            <ClientSearch />
         </div>
         <div className="col">
            <ClientSearchByTag data={props.clientTagOptions} />
         </div>
      </div>
   );
};

export default Toolbar;
