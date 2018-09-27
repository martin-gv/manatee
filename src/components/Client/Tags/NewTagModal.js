import React from "react";
import Modal from "../../UI/Shared/Modal";

class NewTagModal extends React.Component {
   state = {
      category: "",
      name: "",
      loading: false,
      message: ""
   };

   handleSubmit = async e => {
      e.preventDefault();
      this.setState({ loading: true, message: "" });
      const data = { category: this.state.category, name: this.state.name };
      const res = await this.props.createNewTag(data);
      if (res) {
         const message = "Tag created successfully!";
         this.setState({ category: "", name: "", loading: false, message });
      }
   };

   render() {
      const { open, toggle } = this.props;
      const loading = this.state.loading ? " loading" : "";

      return (
         <Modal
            open={open}
            close={() => {
               this.setState({ message: "" });
               toggle("newTag");
            }}
            className="NewTagModal"
         >
            <h3 style={{ marginBottom: 20 }}>Create New Tag</h3>
            <form className="ui form" onSubmit={this.handleSubmit}>
               <div className="field">
                  <label>Category</label>
                  <input
                     type="text"
                     value={this.state.category}
                     onChange={({ target }) =>
                        this.setState({ category: target.value })
                     }
                     required
                  />
               </div>
               <div className="field">
                  <label>Name</label>
                  <input
                     type="text"
                     value={this.state.name}
                     onChange={({ target }) =>
                        this.setState({ name: target.value })
                     }
                     required
                  />
               </div>
               {this.state.message && (
                  <div
                     className="positive-message"
                     style={{ marginBottom: 14 }}
                  >
                     {this.state.message}
                  </div>
               )}
               <button className={"ui blue button" + loading}>Create</button>
            </form>
         </Modal>
      );
   }
}

export default NewTagModal;
