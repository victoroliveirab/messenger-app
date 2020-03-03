import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

export default function DatePicker() {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = date => setSelectedDate(date);
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                name="birthday"
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="yyyy/MM/dd"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    "aria-label": "change date"
                }}
                fullWidth
            />
        </MuiPickersUtilsProvider>
    );
}
