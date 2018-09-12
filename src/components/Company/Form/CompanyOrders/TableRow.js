import React from "react";
import moment from "moment";

const TableRow = props => {
   const { orderId, clientId, createdAt, title } = props.order;
   const { onClick } = props;

   return (
      <tr onClick={() => onClick(orderId)}>
         <td>{orderId}</td>
         <td>{clientId}</td>
         <td>{moment(createdAt).format("MMM Do YYYY")}</td>
         <td>{title}</td>
      </tr>
   );
};

export default TableRow;
