import React, { useState } from "react";
import styles from "./venueDetailCard.module.css";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

const VenueDetailCard = ({ venue, setVenue }) => {
  const [irgDates, setIrgDates] = useState(false);
  const [irgHours, setIrgHours] = useState(false);
  const [numCourts, setNumCourts] = useState(1);

  return (
    <div className={styles[`card-container`]}>
      <div className={styles.card}>
        <div className={styles[`row-top`]}>
          <div className={styles[`title`]}>{venue.name}</div>
          <div className={styles.subtitle}>{venue.addressString}</div>
        </div>
        <div />
        <div className={styles.row}>
          <div className={styles[`number-container`]}>
            <NumberInput
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                height: "2.8rem",
              }}
              value={numCourts}
              min={1}
            >
              <NumberInputField
                className={styles[`num-input`]}
                style={{ height: "2.8rem" }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  color="purple.600"
                  onClick={() => setNumCourts(numCourts + 1)}
                />
                <NumberDecrementStepper
                  color="purple.600"
                  onClick={
                    numCourts === 1
                      ? () => {}
                      : () => setNumCourts(numCourts - 1)
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <div className={styles[`input-container-details`]}>
            <input
              className={styles[`input`]}
              placeholder="Location-specific Instructions"
              type="select"
            ></input>
          </div>
          <div className={styles[`larger-input-container`]}>
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
                  irgDates ? styles[`checkbox-checked`] : styles.checkbox
                }
                type="checkbox"
                id="1"
                value="poolPlay"
                onClick={() => setIrgDates(!irgDates)}
              >
                ✓
              </div>
              <label>Irregular Dates?</label>
            </div>
            <div className={styles[`column-container`]}>
              <div
                className={
                  irgDates
                    ? styles[`input-container`]
                    : styles[`input-container-disabled`]
                }
              >
                <input
                  disabled={!irgDates}
                  className={
                    irgDates ? styles[`input`] : styles[`input-disabled`]
                  }
                  placeholder="Exluded Dates"
                  type="select"
                ></input>
              </div>
            </div>
          </div>
          <div className={styles[`larger-input-container`]}>
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
                  irgHours ? styles[`checkbox-checked`] : styles.checkbox
                }
                type="checkbox"
                id="1"
                value="poolPlay"
                onClick={() => setIrgHours(!irgHours)}
              >
                ✓
              </div>
              <label>Irregular Dates?</label>
            </div>
            <div className={styles[`column-container`]}>
              <div
                className={
                  irgHours
                    ? styles[`input-container`]
                    : styles[`input-container-disabled`]
                }
              >
                <input
                  disabled={!irgHours}
                  className={
                    irgHours ? styles[`input`] : styles[`input-disabled`]
                  }
                  placeholder="Select Hours"
                  type="select"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailCard;
