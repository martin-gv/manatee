import React from "react";

const InventoryItem = props => {
   const { inventoryID, title, artist, type, medium, price } = props;
   return (
      <div className="section" style={{ marginRight: 0, marginTop: 0 }}>
         <h3>Inventory Item</h3>

         {inventoryID && (
            <div>
               <div>
                  {title}{" "}
                  <span style={{ color: "#555", marginLeft: 9 }}>
                     ID {inventoryID}
                  </span>
               </div>
               <div>{artist}</div>
               <div>{type}</div>
               <div>{medium}</div>
               <div>{price ? <div>${price}</div> : null}</div>
            </div>
         )}

         <hr />
         {!inventoryID ? (
            <button
               className="ui basic blue button"
               onClick={() => props.toggle("item")}
               disabled={props.isVoid}
            >
               Add Item
            </button>
         ) : (
            <button
               className="ui basic red button"
               onClick={props.removeItem}
               disabled={props.isVoid}
            >
               Remove Item
            </button>
         )}
      </div>
   );
};

export default InventoryItem;
