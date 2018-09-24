import React from "react";

const FormField = props => {
   const { field, value, label, onChange } = props;

   return (
      <div className="field">
         <label>{label}</label>
         <input name={field} value={value || ""} onChange={onChange} />
      </div>
   );
};

export default FormField;
