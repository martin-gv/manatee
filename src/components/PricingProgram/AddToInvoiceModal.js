import React from "react";
import Modal from "../UI/Shared/Modal";

class AddToInvoiceModal extends React.Component {
   state = {
      id: ""
   };

   handleChange = e => {
      this.setState({ id: e.target.value });
   };

   render() {
      const { id } = this.state;
      const { isOpen, toggle, addToOrder } = this.props;

      return (
         <Modal open={isOpen} close={toggle}>
            <h3 style={{ marginBottom: 20 }}>Add to Order</h3>
            <form className="ui form" onSubmit={e => addToOrder(e, id)}>
               <div className="field">
                  <label>Invoice #</label>
                  <input name="id" value={id} onChange={this.handleChange} />
               </div>
               <button className="ui blue button">Add to Order</button>
            </form>
         </Modal>
      );
   }
}

export default AddToInvoiceModal;
