import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { fetchClientTag } from "../../../store/actions/system";
import { addTagToClient } from "../../../store/actions/clients";

class ClientTags extends React.Component {
   state = {
      option: ""
   };

   componentDidMount = () => {
      this.props.fetchClientTag();
   };

   onAddTagButtonClick = async () => {
      const { option } = this.state;
      const { tags, clientID } = this.props;

      // prevent action if no option selected
      if (!option) {
         return;
      }

      // prevent adding duplicate tags
      const selected = option.value;
      const tagIDs = tags.map(el => el._id);
      if (tagIDs.includes(selected._id)) {
         return;
      }

      await this.props.addTagToClient(clientID, selected, "$push");
      this.setState({ option: "" });
   };

   onDeleteTagButtonClick = tag => {
      this.props.addTagToClient(this.props.clientID, tag, "$pull");
   };

   render() {
      const tags = this.props.tags.map(el => (
         <span className="badge badge-secondary mr-3 mb-3" key={el._id}>
            {el.category} -> {el.name}{" "}
            <button
               className="btn btn-secondary btn-sm"
               onClick={() => this.onDeleteTagButtonClick(el)}
            >
               x
            </button>
         </span>
      ));

      const tagIDs = tags.map(el => el._id);
      const clientTagOptions = this.props.data
         .filter(el => !tagIDs.includes(el._id))
         .map(el => ({
            label: `${el.category} -> ${el.name}`,
            value: el
         }));

      return (
         <div className="section">
            <h3 style={{ marginBottom: 15 }}>Tags</h3>
            <div className="ui grid">
               <div className="twelve wide column">
                  <Select
                     options={clientTagOptions}
                     onChange={option => this.setState({ option })}
                     value={this.state.option}
                     disabled={clientTagOptions.length === 0}
                  />
               </div>
               <div className="four wide column">
                  <button
                     className="ui basic primary button"
                     onClick={this.onAddTagButtonClick}
                     disabled={!this.state.option}
                  >
                     <i className="tag icon" />
                     Add Tag
                  </button>
               </div>
            </div>
            <hr />
            <span style={{ fontSize: "18px" }}>{tags}</span>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      data: state.system.clientTagOptions
   };
}

export default connect(
   mapStateToProps,
   { fetchClientTag, addTagToClient }
)(ClientTags);
