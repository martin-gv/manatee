import React from "react";

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

   // const orderTotal = props.rows.reduce((acc, current) => {
   //    const total = Big(acc).plus(
   //       Big(current.price || 0).plus(Big(current.itemPrice || 0))
   //    );
   //    return total.toString();
   // }, 0);

   // const js = props.rows.reduce((acc, current) => {
   //    return (
   //       acc +
   //       (parseFloat(current.price) || 0) +
   //       (parseFloat(current.itemPrice) || 0)
   //    );
   // }, 0);

   const { total, isVoid } = props;

   return (
      <div
         className="section"
         style={{ marginTop: -10, marginBottom: 10, marginRight: 0 }}
      >
         <div style={{ marginBottom: -10 }}>
            <h3 style={{ display: "inline-block" }}>Rows</h3>
            <button
               className="ui blue basic button"
               onClick={props.newRowButton}
               disabled={isVoid}
               style={{
                  float: "right",
                  position: "relative",
                  top: -7,
                  padding: "8px 17px"
               }}
            >
               <i className="material-icons">add</i>
               Add Row
            </button>
         </div>
         <hr />
         <table className="small hover clickable" style={{ marginBottom: 30 }}>
            <thead>
               <tr>
                  <th style={{ width: 60 }}>#</th>
                  <th style={{ width: 100 }}>Title</th>
                  <th>Total</th>
               </tr>
            </thead>
            <tbody>{tableRows}</tbody>
         </table>

         <div style={{ fontSize: 16, textAlign: "right" }}>
            Order Total: <span>${total}</span>
         </div>
         {/* <div style={{ textAlign: "right" }}>JS: ${js}</div> */}
         {/* <strong>Total (Local): ${orderTotal}</strong> */}
      </div>
   );
};

export default OrderRowList;
