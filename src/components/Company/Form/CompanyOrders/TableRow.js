import React from "react";
import moment from "moment";

const TableRow = props => {
   const { orderID, clientID, createdAt, title } = props.order;
   const { onClick } = props;

   return (
      <tr onClick={() => onClick(orderID)}>
         <td>{orderID}</td>
         <td>{clientID}</td>
         <td>{moment(createdAt).format("MMM Do YYYY")}</td>
         <td>{title}</td>
      </tr>
   );
};

export default TableRow;
