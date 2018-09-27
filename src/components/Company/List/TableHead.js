import React from "react";

const TableHeader = () => (
   <thead>
      <tr>
         <th style={{ width: 135 }}>Company ID</th>
         <th style={{ width: 170 }}>Name</th>
         <th style={{ width: 130 }}>Date Created</th>
         <th style={{ width: 225 }}>Address</th>
         <th>Primary Contact</th>
      </tr>
   </thead>
);

export default TableHeader;
