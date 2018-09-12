import React from "react";

const Toolbar = props => {
   const { newOrder } = props;
   
   return (
      <div className="ui clearing segment">
         <button
            className="ui blue right floated basic button"
            onClick={newOrder}
         >
            New Order
         </button>
         <button className="ui green right floated basic button">
            Infusionsoft
         </button>
      </div>
   );
};

export default Toolbar;
