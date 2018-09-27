import React from "react";
import moment from "moment";

const buttonStyle = {
   boxShadow: "none",
   fontSize: 13,
   padding: "4px 6px",
   minWidth: 0,
   marginLeft: 15,
   borderRadius: 7
};

const OrderPaymentListItem = props => {
   const {
      paymentID,
      // paymentNum,
      amountPaid,
      datePaid,
      amountRequired,
      dateRequired
   } = props;
   const data = { paymentID, amountRequired };

   return (
      <tr style={{ fontSize: "12px" }}>
         {/* <td>{paymentNum}</td> */}
         <td>{amountPaid ? `$${amountPaid}` : null}</td>
         <td>{datePaid && moment(datePaid).format("MMM Do YYYY")}</td>
         <td>{dateRequired && moment(dateRequired).format("MMM Do YYYY")}</td>
         <td>
            {amountRequired ? `$${amountRequired}` : null}
            {!props.amountPaid && (
               <button
                  className="ui mini green basic button"
                  style={buttonStyle}
                  onClick={() => props.paidButton(data)}
               >
                  Mark as paid
               </button>
            )}
         </td>
      </tr>
   );
};

export default OrderPaymentListItem;
