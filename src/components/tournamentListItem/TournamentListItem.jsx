import React from "react";
import styles from "./TournamentListItem.module.css";
import Status from "../status/Status";

const TournamentListItem = ({ tournament, onView, onEdit, onRemove }) => {
  /*<div className={styles[`list-datum`]}>Status</div>
        <div className={styles[`list-datum`]}>Name</div>
        <div className={styles[`list-datum`]}>Stage</div>
        <div className={styles[`list-datum`]}>Start Date</div>
        <div className={styles[`list-datum`]}>Start Date</div>
        <div className={styles[`list-datum`]}>actions</div>
        <div className={styles[`list-datum`]}>actions</div>
        <div className={styles[`list-datum`]}>actions</div>
    */

  console.log("tournament", tournament);
  const getStage = (status) => {
    if (status === "PRE-EVENT") {
      return "-";
    } else if (status === "FINISHED") {
      return "-";
    }
    return status.toLowerCase();
  };
  return (
    <div className={styles[`list-item`]}>
      <div className={styles[`list-datum`]}>
        <Status status={tournament.attributes.status}></Status>
      </div>

      <div className={styles[`list-datum`]}>{tournament.attributes.name}</div>

      <div className={styles[`list-datum`]}>{tournament.attributes.stage}</div>

      <div className={styles[`list-datum`]}>
        {tournament.attributes.event_dates.data.length > 0 &&
          tournament.attributes.event_dates.data[0].attributes.datetime.split(
            "T"
          )[0]}
      </div>

      <div className={styles[`list-datum`]}>
        <div className={styles[`btn-group`]}>
          <button className={styles.view} onClick={() => onView(tournament)}>
            View
          </button>
          <button className={styles.edit} onClick={onEdit}>
            Edit
          </button>
          <button className={styles.remove} onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentListItem;
