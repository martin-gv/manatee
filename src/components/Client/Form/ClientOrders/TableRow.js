import React from "react";
import moment from "moment";

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
      const { orderID, total, void: isVoid, createdAt } = this.props;

      return (
         <tr
            onClick={this.props.handleRowClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
         >
            <td>
               {orderID} {isVoid && <strong>VOID</strong>}
            </td>
            <td>{moment(createdAt).format("MMM Do YYYY")}</td>
            <td>${total}</td>
            {/* <td>{companyID && <i className="building icon" />}</td> */}
            {/* <td>
               {this.state.hover && (
                  <button
                     className="btn btn-danger btn-sm"
                     onClick={handleDeleteButton}
                  >
                     Delete
                  </button>
               )}
            </td> */}
         </tr>
      );
   }
}

export default ClientOrderListItem;
