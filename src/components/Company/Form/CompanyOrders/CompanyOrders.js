import React from "react";

import TableRow from "./TableRow";

const CompanyOrders = props => {
   const { orders, rowClick } = props;
   const rows = orders.map(el => (
      <TableRow key={el._id} order={el} onClick={rowClick} />
   ));

   return (
      <table className="ui selectable clickable table">
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
   );
};

export default CompanyOrders;
