import React from "react";

class TableBody extends React.Component {
   render() {
      const tableRows = this.props.clients.map(client => {
         const {
            clientID,
            firstName,
            lastName,
            phone,
            email,
            address,
            city
         } = client;
         return (
            <tr key={clientID} onClick={() => this.props.onRowClick(clientID)}>
               <td>{clientID}</td>
               <td>
                  {firstName} {lastName}
               </td>
               <td>{phone}</td>
               <td>{email}</td>
               <td>{address}</td>
               <td>{city}</td>
            </tr>
         );
      });
      return <tbody>{tableRows}</tbody>;
   }
}

export default TableBody;
