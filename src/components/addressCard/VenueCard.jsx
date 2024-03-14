import React, { useState } from "react";
import styles from "./VenueCard.module.css";

const VenueCard = ({ venueId, address, name, onRemove, updateName }) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [haveFocused, setHaveFocused] = useState(false);
  const [venueName, setVenueName] = useState(name);
  const venue = {
    id: venueId,
    name: name,
    addressString: address,
  };
  const updateVanueName = (value) => {
    updateName(venue, value);
    setVenueName(value);
  };

  return (
    <div className={styles[`venue-card`]}>
      <input
        onMouseEnter={() => !haveFocused && setToolTipVisible(true)}
        onMouseLeave={() => setToolTipVisible(false)}
        onFocus={() => {
          setToolTipVisible(false);
          setHaveFocused(true);
        }}
        className={styles[`name-card`]}
        value={venueName}
        onChange={(e) => {
          updateVanueName(e.target.value);
        }}
        placeholder="Enter nickname"
      ></input>

      {toolTipVisible && (
        <label className={styles.tooltip}>Click to edit</label>
      )}
      <div className={styles[`address-card`]}>
        <div className={styles.address}>{address}</div>
        <button className={styles[`btn-remove`]} onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
