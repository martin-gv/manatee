import React from "react";

import DayPickerInput from "react-day-picker/DayPickerInput";
// import { formatDate, parseDate } from "react-day-picker/moment";

const DateRangePicker = props => {
   const { from, to, onChange } = props;

   return (
      <div className="InputFromTo">
         <DayPickerInput
            value={from}
            // format="LL"
            // formatDate={formatDate}
            // parseDate={parseDate}
            hideOnDayClick={false}
            onDayChange={onChange.bind(this, "from")}
            dayPickerProps={{
               selectedDays: [from, { from, to }, to],
               disabledDays: { after: to },
               // modifiers,
               // toMonth: to,
               numberOfMonths: 2,
               showOutsideDays: true,
               enableOutsideDaysClick: true, // is this working?
               onDayClick: () => this.to.getInput().focus()
            }}
         />{" "}
         —{" "}
         <span className="InputFromTo-to">
            <DayPickerInput
               ref={el => (this.to = el)}
               value={to}
               // format="LL"
               // formatDate={formatDate}
               // parseDate={parseDate}
               hideOnDayClick={false}
               onDayChange={onChange.bind(this, "to")}
               dayPickerProps={{
                  selectedDays: [from, { from, to }, to],
                  disabledDays: { before: from },
                  // modifiers,
                  // fromMonth: from,
                  month: from,
                  numberOfMonths: 2,
                  showOutsideDays: true,
                  enableOutsideDaysClick: false
               }}
            />
         </span>
      </div>
   );
};

export default DateRangePicker;
