import React from 'react'
import styles from './TournamentListItem.module.css'
import Status from '../status/Status'



const TournamentListItem = ({tournament, onView, onEdit, onRemove}) => {
    /*<div className={styles[`list-datum`]}>Status</div>
        <div className={styles[`list-datum`]}>Name</div>
        <div className={styles[`list-datum`]}>Stage</div>
        <div className={styles[`list-datum`]}>Start Date</div>
        <div className={styles[`list-datum`]}>Start Date</div>
        <div className={styles[`list-datum`]}>actions</div>
        <div className={styles[`list-datum`]}>actions</div>
        <div className={styles[`list-datum`]}>actions</div>
    */
    function getSimpleStatus(status){
        if(status==="PRE-EVENT"){
            console.log("s")
            return "scheduled"
        } else if(status==="FINISHED"){
            console.log("f")
            return "finished"
        }
        console.log('a')
        return "active"
    }

    const getStage = (status) => {
        if(status==="PRE-EVENT"){
            return "-"
        } else if(status==="FINISHED"){
            return "-"
        }
        return status.toLowerCase()
    }
    return (
        <div className={styles[`list-item`]}>
            <div className={styles[`list-datum`]}>
                <Status status={getSimpleStatus(tournament.attributes.status)}></Status>
            </div>

            <div className={styles[`list-datum`]}>
                {tournament.attributes.name}
            </div>

            <div className={styles[`list-datum`]}>
            {getStage(tournament.attributes.status)}
            </div>

            <div className={styles[`list-datum`]}>
                Start Date{tournament.attributes.startDate}
            </div>

            <div className={styles[`list-datum`]}>
                End Date{tournament.attributes.startDate}
            </div>

            <div className={styles[`list-datum`]}>
                <div className={styles[`btn-group`]}>
                    <button className={styles.view} onClick={onEdit}>View</button>
                    <button className={styles.edit} onClick={onEdit}>Edit</button>
                    <button className={styles.remove} onClick={onRemove}>Remove</button>
                </div>
            </div>

        </div>
    )
}

export default TournamentListItem