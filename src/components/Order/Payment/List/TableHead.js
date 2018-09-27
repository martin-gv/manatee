import React from "react";

const TableHead = () => (
   <thead>
      <tr>
         {/* <th style={{width: 38}}>#</th> */}
         <th style={{width: 85}}>Amount</th>
         <th style={{width: 140}}>Date</th>
         <th style={{width: 140}}>Date Required</th>
         <th>Amount Required</th>
      </tr>
   </thead>
);

export default TableHead;
