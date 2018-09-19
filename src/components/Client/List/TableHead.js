import React from "react";

const TableHead = () => {
   return (
      <thead>
         <tr>
            <th style={{ width: 70 }}>ID</th>
            <th style={{ width: 170 }}>Name</th>
            <th style={{ width: 130 }}>Phone</th>
            <th style={{ width: 225 }}>Email</th>
            <th style={{ width: 225 }}>Address</th>
            <th>City</th>
         </tr>
      </thead>
   );
};

export default TableHead;
