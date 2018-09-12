import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class NewOrderModal extends React.Component {
   render() {
      const {
         contacts,
         isOpen,
         toggle,
         submit,
         selectedID,
         onSelect
      } = this.props;
      const rows = contacts.map(el => (
         <tr
            key={el._id}
            onClick={() => onSelect(el.clientId)}
            className={selectedID === el.clientId ? "selected" : null}
         >
            <td>
               {el.firstName} {el.lastName}
            </td>
         </tr>
      ));

      return (
         <Modal
            isOpen={isOpen}
            toggle={toggle}
            centered
            style={{ maxWidth: "400px" }}
         >
            <ModalHeader>Select Company Contact</ModalHeader>
            <form className="ui form" onSubmit={submit}>
               <ModalBody>
                  <p>Who is placing this order?</p>
                  <table className="ui selectable clickable table">
                     <tbody>{rows}</tbody>
                  </table>
               </ModalBody>
               <ModalFooter>
                  <button className="ui blue button" disabled={!selectedID}>
                     Confirm
                  </button>
               </ModalFooter>
            </form>
         </Modal>
      );
   }
}

export default NewOrderModal;
