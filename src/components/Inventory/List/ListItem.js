import React from "react";

const InventoryListItem = props => {
   const { selectedItemID, inventoryID, checked, artist, title, type } = props;
   return (
      <tr
         onClick={props.handleRowClick}
         className={selectedItemID === inventoryID ? "selected" : null}
      >
         <td>
            <div className="ui checkbox">
               <input
                  type="checkbox"
                  checked={checked || ""}
                  onChange={e =>
                     props.onChange(inventoryID, "checked", e.target.checked)
                  }
               />
               <label />
            </div>
         </td>
         <td>{inventoryID}</td>
         <td>{artist}</td>
         <td>{title}</td>
         <td>{type}</td>
      </tr>
   );
};

export default InventoryListItem;
