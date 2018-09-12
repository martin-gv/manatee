import React from "react";
import moment from "moment";

const OrderPaymentListItem = props => {
   const {
      paymentID,
      paymentNum,
      amountPaid,
      datePaid,
      amountRequired,
      dateRequired
   } = props;
   const data = { paymentID, amountRequired };

   return (
      <tr style={{ fontSize: "12px" }}>
         <td>{paymentNum}</td>
         <td>{amountPaid}</td>
         <td>{datePaid && moment(datePaid).format("MMM Do YYYY")}</td>
         <td>{dateRequired && moment(dateRequired).format("MMM Do YYYY")}</td>
         <td>
            {amountRequired}
            {!props.amountPaid && (
               <button
                  className="ui mini green basic button"
                  onClick={() => props.paidButton(data)}
               >
                  Pay
               </button>
            )}
         </td>
      </tr>
   );
};

export default OrderPaymentListItem;
