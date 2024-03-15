import React, { useEffect, useState } from "react";
import styles from "./CreateEvent.module.css";
import "./CreateEvent.css";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
} from "@chakra-ui/react";
import { useAddEntityMutation, useGetEntitiesQuery } from "../../services/playmaker";
import SearchBar from "../addressSearch/SearchBar";
import SearchResultsList from "../addressSearch/SearchResultsList";
import DatePicker from "../datePIcker/DatePicker";
import VenueCard from "../addressCard/VenueCard";
import ProgressBar from "../progressBar/ProgressBar";
import VenueDetailCard from "../venueDetailCard/VenueDetailCard";
import TimeCard from "../timeCard/TimeCard";

const CreateEvent = ({ onClose }) => {
  //tournament information state variables
  const [poolPlay, setPoolPlay] = useState(false);
  const [crossOver, setCrossOver] = useState(false);
  const [venues, setVenues] = useState([]);
  const [numPools, setNumPools] = useState(4);
  const [numTiers, setNumTiers] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const [queryDates, setQueryDates] = useState({})
  const getQueryDates = () => queryDates
  const [tournamentName, setTournamentName] = useState("");
  const [stage, setStage] = useState(1);
  const [bracketType, setBracketType] = useState();

  // error handling
  const [error, setError] = useState(false);

  // address search state variables
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [searchBarFilled, setSearchBarFilled] = useState(false);
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  // constants
  const minPoolSize = 3;
  const monthIndices = {
    "Jan": 0,
    "Feb": 1,
    "Mar": 2,
    "Apr": 3,
    "May": 4,
    "Jun": 5,
    "Jul": 6,
    "Aug": 7,
    "Sep": 8,
    "Oct": 9,
    "Nov": 10,
    "Dec": 11
  }

  // fetching
  // get all bracket types
  const { data: bTypes } = useGetEntitiesQuery({
    name: "bracket-type",
    populate: true,
  });
  const [addEntity] = useAddEntityMutation();

  // Tournament information front end functions
  const incrementNumPools = () => setNumPools(numPools + 1);
  const decrementNumPools = () =>
    numPools > minPoolSize && setNumPools(numPools - 1);

  const incrementNumTiers = () => setNumTiers(numTiers + 1);
  const decrementNumTiers = () => numTiers > 1 && setNumTiers(numTiers - 1);

  const addVenue = () => {
    setVenues([...venues, selectedAddress]);
    setSelectedAddress(null);
    setSearchBarFilled(false);
    setInput("");
    setResults([]);
  };

  // Tournament info frontend functions functions, proccessing state variables
  const updateAddress = (e) => {
    console.log(e.target.value);
  };

  const updateVenueName = (venue, newName) => {
    // makes changes in the state variable,
    //upates venue upon any change in the venue nickname input
    venue.name = newName;
    let i;
    for (i = 0; i < venues.length; i++) {
      if (venues[i].id === venue.id) {
        break;
      }
    }
    venues[i] = venue;
  };

  const removeVenue = (id) => {
    setVenues(venues.filter((venue) => venue.id !== id));
  };

  const updateVenue = (address, name, numCourts) => {
    console.log(address + name + numCourts);
  };

  // utility functions
  // get progress value for progress bar
  const getProgressValue = (i) => {
    if (i === 1) return 9;

    if (i === 2) return 40;

    if (i === 3) return 70;

    return 100;
  };
  // check if all fields are filled for a given form stage
  const resolveStage = (stage) => {
    if (stage === 1) {
      if (
        venues &&
        venues.length > 0 &&
        selectedDates &&
        selectedDates.length > 0 &&
        tournamentName &&
        bracketType
      ) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  };
  //format dates for the tournament creation query
  const formatQueryDates = (q) => Object.keys(q).map(dateAndStage => {
    const date = dateAndStage.split(";")[0]
    const stage = dateAndStage.split(";")[1]
    const time = q[dateAndStage]
    const datetime = new Date(
      date.split(" ")[3],
      monthIndices[date.split(" ")[1]],
      date.split(" ")[2],
      time.split(":")[0],
      time.split(":")[1]
    )
    const open_check_in = dateAndStage.split(";").length > 3
    const check_in_policy = dateAndStage.split(";")[2]
    return {
      datetime,
      check_in_policy,
      open_check_in,
      stage_action: stage
    }
  })

  // click functions
  const handleChange = (e) => {
    console.log("event name", e.target.value);
    setTournamentName(e.target.value);
  };

  const handleSecondaryClick = () => {
    if (stage === 1) {
      onClose();
    } else {
      setStage(stage - 1);
    }
  };
  const handlePrimaryClick = async () => {
    if (stage === 4) {
      const data = {
        name: tournamentName,
        num_tiers: numTiers,
        bracket_type: bracketType,
        pool_play: poolPlay,
        cross_over: crossOver,
        dates: formatQueryDates(queryDates),
        venues: venues.map(venue => venue.id),
        pool_size: minPoolSize,
        match_time_minutes: 30
      }
      const response = await addEntity({ name: "tournament", body: { data } });
      console.log(response);
      onClose();
    } else {
      if (true || resolveStage(stage)) {
        //setError(false);
        setStage(stage + 1);
        console.log("dates", selectedDates);
      } else {
        //setError(true);
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <head>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@100;200;300;400;500;600&family=Inter:wght@200;300;400;500;600;900&family=Oswald&display=swap');
          </style>
        </head>
        {/* progress bar */}
        <ProgressBar value={getProgressValue(stage)} />
        {/* stage 1*/}
        {stage === 1 && (
          <>
            <div className={styles[`input-container`]}>
              <input
                className={styles.input}
                placeholder="Event Name"
                value={tournamentName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles.r}>
              {/* column 1 */}
              <div className={styles.c}>
                {/* pool play information */}
                <div className={styles[`info-container`]}>
                  <h1 className={styles[`section-heading`]}>Pool Play</h1>
                  {/* poolplay checkbox and boolean control */}
                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        color: "white",
                        fontSize: "0.9rem",
                      }}
                    >
                      <div
                        className={
                          poolPlay
                            ? styles[`checkbox-checked`]
                            : styles.checkbox
                        }
                        type="checkbox"
                        id="1"
                        value="poolPlay"
                        onClick={() => setPoolPlay(!poolPlay)}
                      >
                        ✓
                      </div>
                      <label>Pool play</label>
                    </div>
                    {/* crossover match checkbox and crossOver boolean control */}
                    <div
                      className={
                        poolPlay ? styles.fable : styles[`fable-disabled`]
                      }
                    >
                      <div
                        className={
                          !poolPlay
                            ? styles[`checkbox-disabled`]
                            : crossOver
                              ? styles[`checkbox-checked`]
                              : styles.checkbox
                        }
                        type="checkbox"
                        id="1"
                        value="poolPlay"
                        onClick={
                          poolPlay ? () => setCrossOver(!crossOver) : () => null
                        }
                      >
                        ✓
                      </div>
                      <label> Cross-over match </label>
                    </div>
                  </div>
                  <div style={{ color: "white", fontSize: "0.9rem" }}>
                    <label>Ideal pool size:</label>
                    <NumberInput
                      style={{ backgroundColor: "white", borderRadius: "10px" }}
                      value={numPools}
                      min={3}
                    >
                      <NumberInputField className={styles[`num-input`]} />
                      <NumberInputStepper>
                        <NumberIncrementStepper
                          color="purple.600"
                          onClick={incrementNumPools}
                        />
                        <NumberDecrementStepper
                          color="purple.600"
                          onClick={decrementNumPools}
                        />
                      </NumberInputStepper>
                    </NumberInput>
                  </div>
                </div>
                {/* end of pool play information */}
                {/* bracket type information */}
                <div className={styles[`info-container`]}>
                  <h1 className={styles[`section-heading`]}>Playoffs</h1>
                  <select
                    className={styles[`drop-down`]}
                    onChange={(e) => setBracketType(e.target.value)}
                    value={bracketType}
                  >
                    <option value="DEFAULT" disabled selected>
                      Bracket type
                    </option>
                    {bTypes &&
                      bTypes.data.map((type) => (
                        <option value={type.id}>{type.attributes.type}</option>
                      ))}
                  </select>
                  <div style={{ color: "white", fontSize: "0.9rem" }}>
                    <label>Number of tiers:</label>
                    <NumberInput
                      style={{ backgroundColor: "white", borderRadius: "5px" }}
                      value={numTiers}
                      min={1}
                    >
                      <NumberInputField className={styles[`num-input`]} />
                      <NumberInputStepper>
                        <NumberIncrementStepper
                          color="purple.600"
                          onClick={incrementNumTiers}
                        />
                        <NumberDecrementStepper
                          color="purple.600"
                          onClick={decrementNumTiers}
                        />
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
                    <div style={{ display: "flex", width: "100%" }}>
                      <SearchBar
                        setResults={setResults}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                        filled={setSearchBarFilled}
                        updateName={updateAddress}
                        input={input}
                        setInput={setInput}
                      />
                      {selectedAddress && (
                        <button className={styles.btn} onClick={addVenue}>
                          Add Venue
                        </button>
                      )}
                    </div>
                    <SearchResultsList
                      results={results}
                      setSelectedAddress={setSelectedAddress}
                    />
                  </div>
                  <div className={styles[`venue-list`]}>
                    {venues[0] &&
                      venues.map((venue) => (
                        <VenueCard
                          venueId={venue.id}
                          address={venue.addressString}
                          updateName={updateVenueName}
                          name={venue.name}
                          onRemove={() => removeVenue(venue.id)}
                        />
                      ))}
                  </div>
                </div>
                {/* end of location search */}
              </div>
              {/* end column 1 */}
              {/* column 2 */}
              <div className={styles.c}>
                {/* date pick */}
                <DatePicker
                  selectedDates={selectedDates}
                  setSelectedDates={setSelectedDates}
                ></DatePicker>
              </div>
              {/* end column 2 */}
            </div>
            {/* end of row */}
          </>
        )}
        {/* stage 2*/}
        {stage === 2 && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
              }}
            >
              {venues[0] &&
                venues.map((venue) => (
                  <VenueDetailCard
                    venue={venue}
                    setVenue={updateVenue}
                  ></VenueDetailCard>
                ))}
            </div>
          </>
        )}
        {/* stage 1*/}
        {stage === 3 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                maxHeight: "30rem",
                overflowY: "scroll",
                flexWrap: "wrap",
              }}
            >
              {selectedDates.map((d,i) => (
                <TimeCard
                  date={d}
                  queryDates={getQueryDates}
                  setQueryDates={setQueryDates}
                  last={i === selectedDates.length - 1}
                ></TimeCard>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* footer, inside the component*/}
      <div className={styles.footer}>
        <button
          className={styles[`modal-btn-secondary`]}
          onClick={handleSecondaryClick}
        >
          {stage === 1 ? "Cancel" : "Back"}
        </button>
        <Popover>
          <PopoverTrigger>
            <button
              className={styles[`modal-btn-primary`]}
              onClick={handlePrimaryClick}
            >
              {stage === 4 ? "Create" : "Next"}
            </button>
          </PopoverTrigger>

          {error && (
            <PopoverContent color="#E040FB" bg="#1E113C" borderColor="#1E113C">
              <PopoverCloseButton />

              <PopoverHeader borderColor="black">
                Please fill out all required fields
              </PopoverHeader>
            </PopoverContent>
          )}
        </Popover>
      </div>
    </div>
    /* end of conainer */
  );
};

export default CreateEvent;
