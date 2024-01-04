import React, { useState } from 'react'
import MapsLogo from './assets/MapsLogo.svg'
import { getLocationAutomplete } from '../../services/locationIQ'



const SearchBar = ({ setResults, selectedAddress, setSelectedAddress, filled, updateName, input, setInput }) => {
  const checkEndings = [
    " ",
    ",",
    "-",
    "ave",
    "street",
    "st",
    "drive",
    "dr",
    "road",
    "rd",
    "place",
    "pl",
    "court",
    "ct",
    "boulevard",
    "blvd",
    "lane",
    "ln",
    "circle",
    "cir",
    "way",
    "terrace",
    "ter",
    "avenue",
    "alley",
    "aly",
    "square",
    "sq",
    "loop",
    "parkway",
    "pkwy",
    "expressway",
    "expy",
    "highway",
    "hwy",
    "crescent",
    "cres",
    "court",
    "ct",
    "place",
    "pl",
    "route",
    "center"
    // Add more common street address endings as needed
  ];
  function hasEnding(value) {
    for (let i = 0; i < checkEndings.length; i++) {
      if (value.toLowerCase().endsWith(checkEndings[i])) {
        return true; // Return true if the string ends with any suffix in the array
      }
    }
    return false; // Return false if the string doesn't end with any suffix in the array
  }
  
  const filterSearch = async (value) => {
    console.log("key")
    console.log(value)
    if(selectedAddress){
      setSelectedAddress(null);
    } else if (value) {
      filled(true)
    } else {
      filled(false)
      setResults([])
    }
    setInput(value);
    if(hasEnding(value)){
      const results = await getLocationAutomplete(value)
      console.log("results")
      console.log(results)
      setResults(results)
    }
    console.log(selectedAddress? "address selected" : "address is not seleceted")
  }

  return (
    <div className='input-wrapper'>
      <input className='address-input' placeholder='Venue addresss(es)' value={selectedAddress ? selectedAddress.addressString : filled? input : ""} onChange={(e) => { filterSearch(e.target.value); updateName(e) }} />
      <img className="icon"src={MapsLogo} alt=""></img>
    </div>
  )
}

export default SearchBar