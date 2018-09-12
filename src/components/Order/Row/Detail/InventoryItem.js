import React from "react";

const InventoryItem = props => {
   const { inventoryID, title, artist, type, medium, price } = props;
   return (
      <div className="ui segment">
         <h5>Inventory Item</h5>
         <div>{inventoryID}</div>
         <div>{title}</div>
         <div>{artist}</div>
         <div>{type}</div>
         <div>{medium}</div>
         <div>$ {price}</div>
      </div>
   );
};

export default InventoryItem;
