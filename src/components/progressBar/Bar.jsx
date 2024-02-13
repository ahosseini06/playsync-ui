import React from 'react'

const Bar = ({value, color}) => {
    const bg = color ? color : "#673AB7"
    //transitions all ease in out in line style:;

    return (
        <div style={{display:"flex", height:"0.5rem", borderRadius:"2px", alignItems:"start", backgroundColor:"#D1C4E9"}}>
            <div 
            style={
                {
                    backgroundColor: `${bg}`, 
                    width:`${value}%`, 
                    height: "100%", 
                    borderTopLeftRadius:"2px",
                    borderBottomLeftRadius:"2px",
                    borderTopRightRadius: value === 100 ? "2px" : "0px",
                    borderBottomRightRadius: value === 100 ? "2px" : "0px",
                    transition: "width 0.5s ease-in-out"
            }}>

            </div>
        </div>
    )
}

export default Bar