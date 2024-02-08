import React from 'react'
import { FaRegCalendar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";


import { AiOutlineCarryOut } from "react-icons/ai";
import   { MdOutlineRadioButtonChecked } from "react-icons/md";

const Status = ({status}) => {
    function capitlize(string){
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
  return (
    <>{
        status === "scheduled" ? 
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap: "0.1rem", color:"grey"}}>
            <MdOutlineRadioButtonChecked/>
            {capitlize(status)}
        </div> : 
        status === "complete" ? 
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap: "0.1rem", color:"grey"}}>
            <FaCalendarCheck></FaCalendarCheck>
            <p>{capitlize(status)}</p>
        </div> : 
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap: "0.1rem", color:"green"}}>
            <MdOutlineRadioButtonChecked/>
            {capitlize(status)}
        </div>
    }</>
  )
}

export default Status