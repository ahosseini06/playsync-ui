import React from "react";
import styles from "./TimeCard.module.css";

const TimeCard = ({ date, setDate }) => {
  return (
    <div className={styles.card}>
      <div className={styles.date}>{`${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`}</div>
      <div className={styles.cardBody}>
        <div className={styles.container}>
          <label>Start Time</label>
          <input
            style={{
              width: "100%",
              backgroundColor: "white",
              height: "2rem",
              borderRadius: "5px",
              color: "#673AB7",
            }}
            type="time"
            value={date.startTime}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className={styles.container}>
          <label>End Time</label>
          <input
            style={{
              width: "100%",
              backgroundColor: "white",
              height: "2rem",
              borderRadius: "5px",
              color: "#673AB7",
            }}
            type="time"
            value={date.endTime}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeCard;
