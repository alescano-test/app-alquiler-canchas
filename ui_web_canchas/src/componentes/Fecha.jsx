import DatePicker from "react-datepicker"
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"

export const Fecha = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <>
     <DatePicker 
        showIcon
        className="font-texts h-10 hover:border-slate-400 rounded-md border-2 border-verde-claro "
        dateFormat="dd/MM/yyyy"
        selected={selectedDate} 
        onChange={date => setSelectedDate(date)} />
    </>
  );
};
