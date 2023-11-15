import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import dayjs from 'dayjs';
import { DatePicker } from "@mui/x-date-pickers";

export const Date = () =>{
    const [value, setValue] = React.useState(dayjs())
    return <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="card w-full max-w-xs h-12 bg-base-100 shadow-xl">
                <DatePicker  value={value} onChange={(newValue) => setValue(newValue)}/> 
            </div>
        </LocalizationProvider>
              
    </>

}