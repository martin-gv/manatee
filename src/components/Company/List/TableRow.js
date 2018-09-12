import React from "react";
import moment from "moment";

const TableRow = props => {
   const { companyID, name, address1, createdAt, rowClick } = props;
   return (
      <tr onClick={() => rowClick(companyID)}>
         <td>{companyID}</td>
         <td>{name}</td>
         <td>{moment(createdAt).format("MMM Do YYYY")}</td>
         <td>{address1}</td>
         <td />
      </tr>
   );
};

export default TableRow;
