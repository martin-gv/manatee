import React from "react";
import moment from "moment";

const TableRow = props => {
   const {
      orderID,
      paymentNum,
      amountPaid,
      actionDate,
      datePaid,
      amountRequired,
      dateRequired,
      rowClick,
      void: isVoid
   } = props;

   // const voidedStyle = isVoid && {
   //    textDecoration: "line-through",
   //    color: "#757575"
   // };

   const smallTextStyle = {
      fontSize: "12px",
      color: "#333"
   };

   return (
      <tr onClick={orderID => rowClick(orderID)}>
         <td>
            {orderID} {isVoid && <strong>VOID</strong>}
         </td>
         <td>{paymentNum}</td>
         <td>
            {amountPaid && "$"}
            {amountPaid}
         </td>
         <td>
            {isVoid && <div>Refunded on</div>}
            {actionDate && moment(actionDate).format("MMM Do YYYY")}
            {isVoid && (
               <div style={smallTextStyle}>
                  <span>Paid </span>
                  {moment(datePaid).format("MMM Do YYYY")}
               </div>
            )}
         </td>
         <td>
            {amountRequired && "$"}
            {amountRequired}
         </td>
         <td>{dateRequired && moment(dateRequired).format("MMM Do YYYY")}</td>
      </tr>
   );
};

export default TableRow;
