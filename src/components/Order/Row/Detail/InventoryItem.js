import React from "react";

const InventoryItem = props => {
   const { inventoryID, title, artist, type, medium, price } = props;
   return (
      <div className="section">
         <h3>Inventory Item</h3>
         <div>{inventoryID}</div>
         <div>{title}</div>
         <div>{artist}</div>
         <div>{type}</div>
         <div>{medium}</div>
         <div>{price ? <div>$ {price}</div> : null}</div>
      </div>
   );
};

export default InventoryItem;
