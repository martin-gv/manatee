import React from "react";
import Modal from "../../../UI/Shared/Modal";

class AddItemModal extends React.Component {
   state = {
      input: ""
   };

   submit = async e => {
      e.preventDefault();
      await this.props.submit(this.state.input);
      this.setState({ input: "" });
   };

   render() {
      const { isOpen, toggle } = this.props;

      return (
         <Modal open={isOpen} close={toggle}>
            <h3 style={{ marginBottom: 20 }}>Add Inventory Item</h3>
            <form className="ui form" onSubmit={this.submit}>
               <div className="field">
                  <input
                     type="text"
                     placeholder="Add by Inventory ID"
                     value={this.state.input}
                     onChange={({ target }) =>
                        this.setState({ input: target.value })
                     }
                  />
               </div>
               <button className="ui basic green button">Add Item</button>
            </form>
         </Modal>
      );
   }
}

export default AddItemModal;
