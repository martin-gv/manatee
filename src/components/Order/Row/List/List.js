import React from "react";
import Big from "big.js";

import OrderRowListItem from "./Item";

const OrderRowList = props => {
   const tableRows = props.rows.map(el => (
      <OrderRowListItem
         key={el._id}
         {...el}
         selected={props.selectedRowId === el._id}
         onRowClick={() => props.handleRowClick(el._id)}
      />
   ));

   const orderTotal = props.rows.reduce((acc, current) => {
      const total = Big(acc).plus(
         Big(current.price || 0).plus(Big(current.itemPrice || 0))
      );
      return total.toString();
   }, 0);

   const js = props.rows.reduce((acc, current) => {
      return (
         acc +
         (parseFloat(current.price) || 0) +
         (parseFloat(current.itemPrice) || 0)
      );
   }, 0);

   const { total, isVoid } = props;

   return (
      <div className="card mb-3">
         <div className="card-header">
            <button
               className="btn btn-primary"
               onClick={props.newRowButton}
               disabled={isVoid}
            >
               New Row
            </button>
         </div>
         <div className="card-body">
            <table className="table table-hover clickable">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Title</th>
                     <th>Price</th>
                  </tr>
               </thead>
               <tbody>{tableRows}</tbody>
            </table>
            <strong>Total: ${total}</strong>
            <br />
            <strong>Total (Local): ${orderTotal}</strong>
            <br />
            <strong>JS: ${js}</strong>
         </div>
      </div>
   );
};

export default OrderRowList;
