import React from "react";

import TableRow from "./TableRow";

const CompanyOrders = props => {
   const { orders, rowClick } = props;
   const rows = orders.map(el => (
      <TableRow key={el._id} order={el} onClick={rowClick} />
   ));

   return (
      <div className="section" style={{ marginRight: 0 }}>
         <h3>Orders</h3>
         <table className="small hover clickable">
            <thead>
               <tr>
                  <th>Invoice #</th>
                  <th>Client ID</th>
                  <th>Date Created</th>
                  <th>Title</th>
               </tr>
            </thead>
            <tbody>{rows}</tbody>
         </table>
      </div>
   );
};

export default CompanyOrders;
