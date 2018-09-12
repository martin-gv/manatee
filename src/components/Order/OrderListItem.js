import React from "react";
import moment from "moment";

const Item = props => {
   const {
      orderID,
      createdAt,
      title,
      total,
      paymentTotal,
      onClick,
      void: isVoid
   } = props;

   const voidedStyle = isVoid && {
      textDecoration: "line-through",
      color: "#757575"
   };

   return (
      <tr onClick={() => onClick(orderID)}>
         <td>
            {orderID} {isVoid && <strong>VOID</strong>}
         </td>
         <td style={voidedStyle}>{moment(createdAt).format("MMM Do YYYY")}</td>
         <td style={voidedStyle}>{title}</td>
         <td style={voidedStyle}>${total}</td>
         <td style={voidedStyle}>${paymentTotal}</td>
      </tr>
   );
};

export default Item;
