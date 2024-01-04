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
        // addresses fake dataset
    const addresses = [
        { id: 1, addressString: "123 Maple Street, Springfield, CA, 98765" },
        { id: 2, addressString: "456 Oak Avenue, Rivertown, NY, 54321" },
        { id: 3, addressString: "789 Elm Road, Lakeside, TX, 12345" },
        { id: 4, addressString: "101 Pine Lane, Mountainview, WA, 67890" },
        { id: 5, addressString: "210 Cedar Court, Brooksville, FL, 34567" },
        { id: 6, addressString: "555 Birch Street, Baytown, LA, 87654" },
        { id: 7, addressString: "777 Willow Avenue, Sunnyside, AZ, 23456" },
        { id: 8, addressString: "888 Spruce Drive, Clearwater, CO, 78901" },
        { id: 9, addressString: "999 Ash Way, Hillcrest, GA, 45678" },
        { id: 10, addressString: "111 Fir Boulevard, Oceanview, MI, 65432" },
        { id: 11, addressString: "135 Pineapple Street, Orchard, CA, 33221" },
        { id: 12, addressString: "246 Walnut Lane, Riverside, NY, 55443" },
        { id: 13, addressString: "378 Elmwood Road, Lakeshore, TX, 66778" },
        { id: 14, addressString: "481 Oakwood Drive, Hilltop, WA, 88765" },
        { id: 15, addressString: "572 Cedar Lane, Brookdale, FL, 22556" },
        { id: 16, addressString: "689 Birch Court, Bayview, LA, 99887" },
        { id: 17, addressString: "702 Willow Street, Sunnydale, AZ, 11223" },
        { id: 18, addressString: "811 Spruce Avenue, Clearview, CO, 33445" },
        { id: 19, addressString: "923 Ashwood Way, Hillside, GA, 77889" },
        { id: 20, addressString: "105 Fir Lane, Oceanfront, MI, 99001" },
        { id: 21, addressString: "213 Maple Drive, Springfield, CA, 22334" },
        { id: 22, addressString: "324 Oak Lane, Riverview, NY, 77890" },
        { id: 23, addressString: "437 Elm Street, Lakewood, TX, 55667" },
        { id: 24, addressString: "540 Pine Court, Mountaindale, WA, 33456" },
        { id: 25, addressString: "655 Cedar Avenue, Brookside, FL, 11234" },
        { id: 26, addressString: "767 Birch Road, Bayville, LA, 66789" },
        { id: 27, addressString: "878 Willow Drive, Sunnyslope, AZ, 88765" },
        { id: 28, addressString: "989 Spruce Boulevard, Clearville, CO, 44556" },
        { id: 29, addressString: "111 Ash Lane, Hilltop, GA, 22111" },
        { id: 30, addressString: "222 Fir Street, Oceanview, MI, 66778" },
        { id: 31, addressString: "333 Maple Avenue, Springdale, CA, 33445" },
        { id: 32, addressString: "444 Oak Road, Riverdale, NY, 55678" },
        { id: 33, addressString: "555 Elm Boulevard, Lakeland, TX, 99000" },
        { id: 34, addressString: "666 Pine Drive, Mountainview, WA, 11222" },
        { id: 35, addressString: "777 Cedar Way, Brooksfield, FL, 33444" },
        { id: 36, addressString: "888 Birch Lane, Bayport, LA, 66777" },
        { id: 37, addressString: "999 Willow Street, Sunnyvale, AZ, 22122" },
        { id: 38, addressString: "123 Spruce Avenue, Clearmont, CO, 88999" },
        { id: 39, addressString: "234 Ashwood Road, Hillsdale, GA, 77887" },
        { id: 40, addressString: "345 Fir Court, Oceanfront, MI, 11223" },
        { id: 41, addressString: "456 Maple Lane, Springview, CA, 44556" },
        { id: 42, addressString: "567 Oak Drive, Riverbank, NY, 22133" },
        { id: 43, addressString: "678 Elm Street, Lakeview, TX, 66778" },
        { id: 44, addressString: "789 Pine Avenue, Mountainville, WA, 99001" },
        { id: 45, addressString: "890 Cedar Road, Brookview, FL, 33445" },
        { id: 46, addressString: "901 Birch Avenue, Baywood, LA, 55667" },
        { id: 47, addressString: "112 Willow Lane, Sunnyside, AZ, 66789" },
        { id: 48, addressString: "223 Spruce Street, Clearwater, CO, 88765" },
        { id: 49, addressString: "334 Ash Lane, Hillcrest, GA, 11234" },
        { id: 50, addressString: "445 Fir Avenue, Oceanville, MI, 66778" },
      ];
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
            <input className={styles.input} placeholder='Event Name' />
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
                    dataArr={addresses}
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