import React from "react";

const ClientListItem = props => {
   const { clientId, firstName, lastName, phone, email } = props.client;
   return (
      <tr onClick={props.handleRowClick} className="client-list-item">
         <td>{clientId}</td>
         <td>
            {firstName} {lastName}
         </td>
         <td>{phone}</td>
         <td>{email}</td>
      </tr>
   );
};

export default ClientListItem;
