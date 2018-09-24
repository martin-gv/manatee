import React from "react";

const OrderToolbar = props => {
   return (
      <div style={{ float: "right", marginBottom: 20 }}>
         <button
            className="ui red basic button"
            disabled={props.isVoid}
            onClick={props.void}
         >
            <i className="material-icons">close</i>
            Void
         </button>
         <button className="ui basic button" onClick={props.viewClient}>
            <i className="material-icons">person</i>
            View Client
         </button>
         <button
            className="ui basic button"
            onClick={props.print}
            // disabled={props.isVoid}
            disabled
         >
            <i className="material-icons">print</i>
            Print
         </button>
      </div>
   );
};

export default OrderToolbar;
