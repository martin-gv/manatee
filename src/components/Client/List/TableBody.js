import React from "react";

class TableBody extends React.Component {
   // todo: function not working, is this an issue with React or Redux?
   // formatPhone = phone => {
   //    let copy = phone;
   //    return copy.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
   // };

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
