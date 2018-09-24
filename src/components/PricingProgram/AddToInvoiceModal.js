import React from "react";
import Modal from "../UI/Shared/Modal";

class AddToInvoiceModal extends React.Component {
   state = {
      id: "",
      loading: false
   };

   handleChange = e => {
      this.setState({ id: e.target.value });
   };

   handleSubmit = e => {
      e.preventDefault();
      this.setState({ loading: true });
      this.props.addToOrder(this.state.id);
   };

   render() {
      const { id } = this.state;
      const { isOpen, toggle } = this.props;
      const loading = this.state.loading ? " loading" : "";

      return (
         <Modal open={isOpen} close={toggle}>
            <h3 style={{ marginBottom: 20 }}>Add to Order</h3>
            <form className="ui form" onSubmit={this.handleSubmit}>
               <div className="field">
                  <label>Invoice #</label>
                  <input name="id" value={id} onChange={this.handleChange} />
               </div>
               <button
                  className={"ui blue button" + loading}
                  disabled={!this.state.id}
               >
                  Add to Order
               </button>
            </form>
         </Modal>
      );
   }
}

export default AddToInvoiceModal;
