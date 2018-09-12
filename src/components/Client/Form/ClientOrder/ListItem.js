import React from "react";

class ClientOrderListItem extends React.Component {
   state = {
      hover: false
   };

   handleMouseEnter = () => {
      this.setState({ hover: true });
   };

   handleMouseLeave = () => {
      this.setState({ hover: false });
   };

   render() {
      const { void: isVoid } = this.props;
      return (
         <tr
            className="client-order-list-item"
            onClick={this.props.handleRowClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
         >
            <td>
               {this.props.orderID} {isVoid && <strong>VOID</strong>}
            </td>
            <td>{this.props.companyID && <i className="building icon" />}</td>
            <td>{this.props.title}</td>
            <td>{this.props.description}</td>
            <td>
               {this.state.hover && (
                  <button
                     className="btn btn-danger btn-sm"
                     onClick={this.props.handleDeleteButton}
                  >
                     Delete
                  </button>
               )}
            </td>
         </tr>
      );
   }
}

export default ClientOrderListItem;
