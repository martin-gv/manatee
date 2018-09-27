import React from "react";

const TableHead = () => (
   <thead>
      <tr>
         <th style={{ width: 117 }}>Invoice #</th>
         <th style={{ width: 128 }}>Payment #</th>
         <th>Amount</th>
         <th>Date Paid</th>
         <th>Amount Required</th>
         <th>Date Required</th>
      </tr>
   </thead>
);

export default TableHead;
