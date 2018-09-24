import React from "react";

const style = {
   display: "inline-block",
   float: "right",
   marginBottom: 20
};

const Toolbar = props => (
   <div style={style}>
      <button className="ui blue button" onClick={props.newOrder}>
         <i className="material-icons">add</i>
         New Order
      </button>
      <button className="ui green basic button" disabled>
         Infusionsoft
      </button>
   </div>
);

export default Toolbar;
