import React, { useState } from 'react'
import styles from './CreateEvent.module.css'
import './CreateEvent.css'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
  } from '@chakra-ui/react'
import { useGetEntitiesQuery } from '../../services/playmaker'
import SearchBar from '../addressSearch/SearchBar'
import SearchResultsList from '../addressSearch/SearchResultsList'
import DatePicker from '../datePIcker/DatePicker'
import VenueCard from '../addressCard/VenueCard'
const CreateEvent = () => {
    // constants
    const minPoolSize = 3;
    // get all bracket types
    const {data: bTypes} = useGetEntitiesQuery({name: 'bracket-type', populate: true})
    // Tournament information state variables
    const [poolPlay, setPoolPlay] = useState(false);
    const [crossOver, setCrossOver] = useState(false);
    const [venues, setVenues] = useState([])
    const [numPools, setNumPools] = useState(4);
    const [selectedDates, setSelectedDates] = useState([]);
    
    


    // Tournament information front end functions
    const incrementNumPools = () => setNumPools(numPools + 1);
    const decrementNumPools = () => numPools > minPoolSize && setNumPools(numPools - 1);
    const addVenue = () => {
        setVenues([...venues, selectedAddress])
        setSelectedAddress(null);
        setSearchBarFilled(false);
        setInput("");
        setResults([])
    }
    // Tournament info frontend functions functions, proccessing state variables
    const updateAddress = (e) => {
        console.log(e.target.value);
    }
    const updateVenueName = (venue, newName) => {
        // makes changes in the state variable, 
        //upates venue upon any change in the venue nickname input
        venue.name = newName; 
        let i;
        for(i=0; i<venues.length; i++){
            if(venues[i].id === venue.id){
                break;
            }
        }
        venues[i] = venue;
    } 
    const removeVenue = (id) => {
        setVenues(venues.filter(venue => venue.id !== id));
    }
    // Tournament information backend functions (pushing to back end)
    const updateVenue = (address, name, numCourts) => {
        console.log(address + name + numCourts);
    }
    const push = ()=> {
        console.log("pushing to backend")
        // if (neccesary state variables have values, push info to tournament,
        // change show modal variable to the next modal avaiable - need to get this variable from parent
    }

    //Adress Stuff
        // address search state variables
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [searchBarFilled, setSearchBarFilled] = useState(false);
    const [results, setResults] = useState([]);
    const [input, setInput] = useState("");
        
    

  return (
    <div className={styles.container}>
        <head>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@100;200;300;400;500;600&family=Inter:wght@200;300;400;500;600;900&family=Oswald&display=swap');
            </style>
        </head>
        <div className={styles[`input-container`]}>
            <input className={styles.input} placeholder='Event Name' />
        </div>
            <div className={styles.r}>

                {/* column 1 */}
                <div className={styles.c}>
                
                {/* pool play information */}        
                <div className={styles[`info-container`]}>
                <h1 className={styles[`section-heading`]}>Pool Play</h1>
                    {/* poolplay checkbox and boolean control */}
                    <div style={{display:"flex", gap:"0.6rem"}}>
                        <div style={{display: "flex", gap:"0.2rem", color: "white", fontSize: "0.9rem"}}>
                            <div 
                                className={poolPlay? styles[`checkbox-checked`] : styles.checkbox} 
                                type="checkbox" id="1" 
                                value="poolPlay"
                                onClick={() => setPoolPlay(!poolPlay)}
                            >
                                ✓
                            </div>
                                <label>Pool play</label>
                        </div>
                    {/* crossover match checkbox and crossOver boolean control */}
                    <div className={poolPlay? styles.fable : styles[`fable-disabled`]}>
                        <div 
                            className={!poolPlay? styles[`checkbox-disabled`] : crossOver? styles[`checkbox-checked`] : styles.checkbox} 
                            type="checkbox" id="1" 
                            value="poolPlay"
                            onClick={poolPlay ? () => setCrossOver(!crossOver) : ()=> null}
                        >
                            ✓
                        </div>
                            <label> Cross-over match </label>
                    </div>
                    
                </div>
                <div style={{color: "white", fontSize: "0.9rem"}}>
                
                <label>Ideal pool size:</label>
                <NumberInput style={{backgroundColor:"white", borderRadius:"10px"}}value={numPools} min={3}>
                <NumberInputField className={styles[`num-input`]} />
                <NumberInputStepper>
                    <NumberIncrementStepper color="purple.600" onClick={incrementNumPools}/>
                    <NumberDecrementStepper color="purple.600" onClick={decrementNumPools}/>
                </NumberInputStepper>
                </NumberInput>

                </div>
            </div>
            {/* end of pool play information */}
             {/* bracket type information */}
             <div className={styles[`info-container`]}>
                    <h1 className={styles[`section-heading`]}>Playoffs</h1>
                    <select className={styles[`drop-down`]}>
                        <option value="DEFAULT" disabled selected>Bracket type</option>
                        {bTypes && bTypes.data.map(type => <option value={type.id}>{type.attributes.type}</option>)}
                    </select>
                    <div style={{color: "white", fontSize: "0.9rem"}}>
                    <label>Number of tiers:</label>
                    <NumberInput style={{backgroundColor:"white", borderRadius:"5px"}} defaultValue={1} min={1}>
                    <NumberInputField className={styles[`num-input`]}/>
                    <NumberInputStepper>
                        <NumberIncrementStepper color="purple.600"/>
                        <NumberDecrementStepper color="purple.600"/>
                    </NumberInputStepper>
                    </NumberInput>
                    </div>
                </div>
            {/* end of bracket type information */}
            {/* location search */}
           
                {/* venues list and add/remove buttons */}
                <div className={styles[`info-container`]}>
                <h1 className={styles[`section-heading`]}>Venues</h1>
                <div className={styles[`search-container`]}>
                    <div style={{display:"flex", width:"100%"}}>
                    <SearchBar
                    setResults={setResults}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    filled={setSearchBarFilled}
                    updateName={updateAddress}
                    input={input}
                    setInput={setInput}
                    />
                    {selectedAddress && <button className={styles.btn}onClick={addVenue}>Add Venue</button>}
                    </div>
                    <SearchResultsList results={results} setSelectedAddress={setSelectedAddress} />
                    
                </div>
                    <div className={styles[`venue-list`]}>
                        {venues[0] &&
                            venues.map(venue => (
                                <VenueCard 
                                venueId={venue.id}
                                address={venue.addressString}
                                name={venue.name}
                                updateName={updateVenueName}
                                onRemove={() => removeVenue(venue.id)}></VenueCard>
                            ))
                        }
                    </div>
                </div>
                {/* end of location search */}
            
        </div>
        {/* end column 1 */}
            {/* column 2 */}
            <div className={styles.c}>
               
                
                {/* date pick */}
                <DatePicker selectedDates={selectedDates} setSelectedDates={setSelectedDates}></DatePicker>
            </div>
            {/* end column 2 */}
        </div>
        {/* end of row */}
    </div>
    /* end of conainer */
  )
}

export default CreateEvent