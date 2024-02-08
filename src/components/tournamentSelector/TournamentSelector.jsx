import React, { useEffect, useState } from 'react'
import { useGetEntitiesByRelationQuery, useUpdateEntityMutation } from '../../services/playmaker';
import styles from './TournamentSelector.module.css'
import { Button } from '@chakra-ui/react';
import TournamentListItem from '../tournamentListItem/TournamentListItem';

const TournamentSelector =  ({tournaments, onView, onEdit}) => {

  return (
    <div className={styles[`list-container`]}> 
    {/*table header*/}
      <div className={styles[`list-header`]}>
        <div className={styles[`list-datum`]}>Status</div>
        <div className={styles[`list-datum`]}>Name</div>
        <div className={styles[`list-datum`]}>Stage</div>
        <div className={styles[`list-datum`]}>Dates</div>
        <div className={styles[`list-datum`]}>Actions</div>
      </div>

    {/*table body*/}
      <div className={styles[`list-body`]}>
        
        {tournaments && tournaments.data.map((t, i) => 
          <TournamentListItem key={i} tournament={t} onView={onView} onEdit={onEdit} onRemove={()=>null}/>
        )}

      </div>
    </div>
  )
}

export default TournamentSelector