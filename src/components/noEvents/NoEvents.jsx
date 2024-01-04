import React from 'react'
import styles from "./NoEvents.module.css"

const NoEvents = ({onBtnClick}) => {
  return (
    <div className={styles[`no-events`]}>
        <h1 className={styles[`heading`]}>You currently have no events</h1>
        <button className={styles[`btn`]} onClick={onBtnClick}>
            click to add event
            <br/>
            <div style={{fontSize: "2.5rem"}}>+</div>
        </button>
    </div>
  )
}

export default NoEvents