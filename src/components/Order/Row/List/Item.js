import React from "react";
import Big from "big.js";

const OrderRowListItem = props => (
   <tr
      className={props.selected ? "selected" : null}
      style={{ fontSize: "12px" }}
      onClick={props.onRowClick}
   >
      <td>{props.rowNum}</td>
      <td>{props.title}</td>
      <td>
         ${" "}
         {Big(props.price || 0)
            .plus(Big(props.itemPrice || 0))
            .toString()}
      </td>
   </tr>
);

export default OrderRowListItem;
