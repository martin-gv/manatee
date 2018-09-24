import React from "react";
import { connect } from "react-redux";
import Modal from "../../UI/Shared/Modal";

import { toggleModalV2 } from "../../../store/actions/system";

class ModalV2 extends React.Component {
   handleToggle = () => {
      this.props.toggleModalV2(false);
   };

   render() {
      return (
         <Modal open={this.props.isOpen} close={this.handleToggle}>
            <div style={{ textAlign: "center" }}>
               <h3 style={{ marginBottom: 20 }}>{this.props.title}</h3>
               <div style={{ marginBottom: 20 }}>{this.props.message}</div>
               <div>
                  <button
                     onClick={this.handleToggle}
                     className="ui basic blue button"
                  >
                     Okay
                  </button>
               </div>
            </div>
         </Modal>
      );
   }
}

function mapStateToProps(state) {
   return {
      isOpen: state.system.modal.isOpen,
      title: state.system.modal.title,
      message: state.system.modal.message
   };
}

export default connect(
   mapStateToProps,
   { toggleModalV2 }
)(ModalV2);
