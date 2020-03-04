import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

export default function DatePicker(props) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = date => {
        setSelectedDate(date);
        if (date.getFullYear()) {
            const dateStr = date.toISOString();
            const tIndex = dateStr.indexOf("T");
            props.updateBirthday(dateStr.substring(0, tIndex));
        }
    };
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
