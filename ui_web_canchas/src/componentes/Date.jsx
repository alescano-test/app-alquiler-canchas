import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import dayjs from 'dayjs';
import { DatePicker } from "@mui/x-date-pickers";

export const Date = () =>{
    const [value, setValue] = React.useState(dayjs('2023-11-13'))
    return <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer  components={['DatePicker']}>
                <DatePicker label="Seleccioná la fecha" classname= "bg-white" value={value} onChange={(newValue) => setValue(newValue)}/>
            </DemoContainer>
        </LocalizationProvider>
        
    </>

}