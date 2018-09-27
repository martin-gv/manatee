import React from "react";
import Modal from "../../../UI/Shared/Modal";

class NewOrderModal extends React.Component {
   render() {
      const {
         contacts,
         open,
         toggle,
         submit,
         selectedID,
         onSelect
      } = this.props;
      const rows = contacts.map(el => (
         <tr
            key={el._id}
            onClick={() => onSelect(el.clientID)}
            className={selectedID === el.clientID ? "selected" : null}
         >
            <td style={{ paddingLeft: 18 }}>
               <i
                  className="material-icons"
                  style={{
                     marginRight: 10,
                     width: 27,
                     top: 5,
                     position: "relative",
                     color: "#0090b2",
                     opacity: selectedID === el.clientID ? 1 : 0
                  }}
               >
                  checkmark
               </i>
               {el.firstName} {el.lastName}
            </td>
         </tr>
      ));

      return (
         <Modal open={open} close={toggle}>
            <h3>Select Company Contact</h3>
            <form className="ui form" onSubmit={submit}>
               {contacts.length ? (
                  <p>Who is placing this order?</p>
               ) : (
                  <p>Add a company contact before creating a new order</p>
               )}
               <table
                  className="hover clickable"
                  style={{ width: 325, border: "1px solid gainsboro" }}
               >
                  <tbody>{rows}</tbody>
               </table>
               <button
                  className="ui blue button"
                  disabled={!selectedID || !contacts.length}
                  style={{ marginTop: 20 }}
               >
                  Confirm
               </button>
            </form>
         </Modal>
      );
   }
}

export default NewOrderModal;
