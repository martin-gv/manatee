import React from "react";

const TableHead = () => {
   return (
      <thead>
         <tr>
            <th style={{width: "20%"}}>Invoice</th>
            <th style={{width: "30%"}}>Date</th>
            <th>Total</th>
         </tr>
      </thead>
   );
};

export default TableHead;
