import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import CreatableSelect from "react-select/lib/Creatable";
import "./ClientTags.css";

import { fetchClientTag } from "../../../store/actions/system";
import { addTagToClient } from "../../../store/actions/clients";

// const customStyles = {
//    control: (base, state) => ({
//       ...base,
//       borderColor: state.isFocused ? "red" : "white"
//    })
// };

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
      const clientTags = this.props.tags.map(tag => (
         <span className="client-tag" key={tag._id}>
            <span className="category">{tag.category}</span>
            <span className="name">{tag.name}</span>
            <i
               className="x icon"
               onClick={() => this.onDeleteTagButtonClick(tag)}
            />
         </span>
      ));

      const tagIDs = clientTags.map(el => el._id);
      const tagOptions = this.props.data
         .filter(tag => !tagIDs.includes(tag._id))
         .map(tag => ({
            label: `${tag.category} - ${tag.name}`,
            value: tag
         }));

      return (
         <div className="section ClientTags">
            <h3 style={{ marginBottom: 15 }}>Tags</h3>
            <div className="ui grid">
               <div className="ten wide column">
                  <Select
                     options={tagOptions}
                     classNamePrefix="tag-select"
                     placeholder="Search tags..."
                     noOptionsMessage={inputValue => {
                        return "No matching tag found";
                     }}
                     onChange={option => this.setState({ option })}
                     value={this.state.option}
                     disabled={tagOptions.length === 0}
                  />

                  <CreatableSelect
                     onChange={option => this.setState({ option })}
                     value={this.state.option}
                     options={tagOptions}
                  />
               </div>
               <div className="six wide column">
                  <button
                     className="ui basic blue button"
                     onClick={this.onAddTagButtonClick}
                     disabled={!this.state.option}
                  >
                     <i className="tag icon" />
                     Add Tag
                  </button>
               </div>
            </div>
            <div style={{ marginTop: 20 }}>{clientTags}</div>
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
